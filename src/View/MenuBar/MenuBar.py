from tkinter import Menu

from View.MenuBar.Items.File import File

from View.MenuBar.Items.Edit import Edit

from View.MenuBar.Items.Help import Help


class MenuBar:

    def __init__(self, main, root):
        self.menu_bar = Menu(root)
        File(main, self.menu_bar)
        Edit(self.menu_bar)
        Help(self.menu_bar)
        root.config(menu=self.menu_bar)

