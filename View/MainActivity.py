from tkinter import *
from tkinter import ttk


class MainActivity:

    def __init__(self):
        self.root = Tk()
        self.frame = None
        self.menu_bar = Menu(self.root)
        self.root.title("RCTools")
        self.menu_bar = Menu(self.root)
        self.file_menu = Menu(self.menu_bar, tearoff=0)
        self.help_menu = Menu(self.menu_bar, tearoff=0)
        self.edit_menu = Menu(self.menu_bar, tearoff=0)

    def show(self):
        # Main Frame
        self.frame = ttk.Frame(self.root, width=1080, height=720, padding="3 3 12 12")
        self.frame.grid()
        self.frame.columnconfigure(0, weight=1)
        self.frame.rowconfigure(0, weight=1)

        # First item on menu bar: FILE
        self.file_menu.add_command(label="New", command=self.do_nothing)
        self.file_menu.add_command(label="Open", command=self.do_nothing)
        self.file_menu.add_command(label="Save", command=self.do_nothing)
        self.file_menu.add_command(label="Save as...", command=self.do_nothing)
        self.file_menu.add_command(label="Close", command=self.do_nothing)
        self.file_menu.add_separator()
        self.file_menu.add_command(label="Exit", command=self.root.quit)
        self.menu_bar.add_cascade(label="File", menu=self.file_menu)

        # Second item on menu bar: EDIT
        self.edit_menu.add_command(label="Undo", command=self.do_nothing)
        self.edit_menu.add_separator()
        self.edit_menu.add_command(label="Cut", command=self.do_nothing)
        self.edit_menu.add_command(label="Copy", command=self.do_nothing)
        self.edit_menu.add_command(label="Paste", command=self.do_nothing)
        self.edit_menu.add_command(label="Delete", command=self.do_nothing)
        self.edit_menu.add_command(label="Select All", command=self.do_nothing)
        self.menu_bar.add_cascade(label="Edit", menu=self.edit_menu)

        # Third item on menu bar: HELP
        self.help_menu.add_command(label="Help Index", command=self.do_nothing)
        self.help_menu.add_command(label="About...", command=self.do_nothing)
        self.menu_bar.add_cascade(label="Help", menu=self.help_menu)

        self.root.config(menu=self.menu_bar)
        self.root.mainloop()

    def do_nothing(self):
        file_win = Toplevel(self.root)
        button = Button(file_win, text="Do nothing button")
        button.pack()
