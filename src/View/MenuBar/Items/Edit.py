from tkinter import Menu


class Edit:

    def __init__(self, menu_bar):
        self.edit_menu = Menu(menu_bar, tearoff=0)
        self.edit_menu.add_command(label="Undo", command=self.do_nothing)
        self.edit_menu.add_separator()
        self.edit_menu.add_command(label="Cut", command=self.do_nothing)
        self.edit_menu.add_command(label="Copy", command=self.do_nothing)
        self.edit_menu.add_command(label="Paste", command=self.do_nothing)
        self.edit_menu.add_command(label="Delete", command=self.do_nothing)
        self.edit_menu.add_command(label="Select All", command=self.do_nothing)
        menu_bar.add_cascade(label="Edit", menu=self.edit_menu)

    def do_nothing(self):
        print("Edit function")
        # file_win = Toplevel(root)
        # button = Button(file_win, text="Do nothing button")
        # button.pack()