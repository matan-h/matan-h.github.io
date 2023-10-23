import inspect
import io

import friendly_traceback.core
import rich.console
import rich.traceback
import markdown

from io import StringIO
import os
import sys
try:
    import hebrew_python
except ImportError:
    hebrew_python = None

console = rich.console.Console(
    color_system="truecolor", force_terminal=True, record=True, file=StringIO())


globals_exec = {
    "console": console,
    "os": os,
    "sys": sys,
}


def run_code(code, hebrew_mode=False):
    if hebrew_mode:
        if not hebrew_python.hook.hebrew_builtins:
            hebrew_python.hook.setup()
    try:
        rich.traceback.open = lambda file, *args, **kwargs: io.StringIO(code) if file == "/program.py" else open(file,
                                                                                                                 *args,
                                                                                                                 **kwargs)  # hook rich open

        if hebrew_mode:
            code = hebrew_python.hook.transform_source(code)
        c = compile(code, "program.py", "exec")

        if hebrew_mode:
            # builtins.__dict__.update(hebrew_python.hook.hebrew_builtins)
            __builtins__.__dict__.update(hebrew_python.hook.hebrew_builtins)

            # all_builtins.update(builtins.__dict__)

        exec(c, globals_exec, {})

        return {}
    except (Exception, SystemExit, SyntaxError):
        exc_type, exc_value, tb = sys.exc_info()

        tb = rich.traceback.Traceback.from_exception(
            exc_type, exc_value, tb, show_locals=True)
        # tb.suppress = ["<exec>"]  # FIXME : this not work
        tb.trace.stacks[0].frames.pop(0)

        # console.print_exception()
        console.print(tb)

        fr = friendly_traceback.core.FriendlyTraceback(*sys.exc_info())
        fr.compile_info()

        generic = fr.info.get("generic", '')
        cause = fr.info.get("cause", '')
        suggest = fr.info.get("suggest", '')

        if suggest:
            suggest = "\n" + suggest

        text = f'{generic}\n{suggest}\n{cause}'
        html = markdown.markdown(text)
        ret = {"error": console.export_html() + "\n\n" + html,
               "shell": inspect.stack()}
        return ret


if __name__ == "__main__":
    if "MAIN" in os.environ:
        rich.print(run_code("."))
