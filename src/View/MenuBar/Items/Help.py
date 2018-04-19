from tkinter import Menu


class Help:

    def __init__(self, menu_bar):
        self.help_menu = Menu(menu_bar, tearoff=0)
        self.help_menu.add_command(label="Help Index", command=self.do_nothing)
        self.help_menu.add_command(label="About...", command=self.do_nothing)
        menu_bar.add_cascade(label="Help", menu=self.help_menu)

    def do_nothing(self):
        print("Help function")
        # file_win = Toplevel(root)
        # button = Button(file_win, text="Do nothing button")
        # button.pack()
