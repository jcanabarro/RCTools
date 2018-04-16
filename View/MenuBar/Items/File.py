from tkinter import Menu, Toplevel, Button


class File:

    def __init__(self, menu_bar):
        self.file_menu = Menu(menu_bar, tearoff=0)
        self.file_menu.add_command(label="New", command=self.do_nothing)
        self.file_menu.add_command(label="Open", command=self.do_nothing)
        self.file_menu.add_command(label="Save", command=self.do_nothing)
        self.file_menu.add_command(label="Save as...", command=self.do_nothing)
        self.file_menu.add_command(label="Close", command=self.do_nothing)
        self.file_menu.add_separator()
        self.file_menu.add_command(label="Exit", command=self.do_nothing)
        menu_bar.add_cascade(label="File", menu=self.file_menu)

    def do_nothing(self):
        print("File function")
        # file_win = Toplevel(root)
        # button = Button(file_win, text="Do nothing button")
        # button.pack()
