from tkinter import Menu, Toplevel, Button

from Utils.FileUtils import FileUtils
from View.General.FileSelector import FileSelector


class File:

    def __init__(self, main, menu_bar):
        self.main = main
        self.file_menu = Menu(menu_bar, tearoff=0)
        self.file_menu.add_command(label="New", command=self.do_nothing)
        self.file_menu.add_command(label="Open", command=self.open_file_selector)
        self.file_menu.add_command(label="Save", command=self.do_nothing)
        self.file_menu.add_command(label="Save as...", command=self.do_nothing)
        self.file_menu.add_command(label="Close", command=self.do_nothing)
        self.file_menu.add_separator()
        self.file_menu.add_command(label="Exit", command=self.do_nothing)
        menu_bar.add_cascade(label="File", menu=self.file_menu)

    def open_file_selector(self):
        file_selector = FileSelector()
        file_name = file_selector.open()
        if (file_name):
            FileUtils.open_picture_finder(self.main, file_name)


    def do_nothing(self):
        pass
