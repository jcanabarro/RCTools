from tkinter import *
from tkinter import ttk

from View.MenuBar.MenuBar import MenuBar


class MainActivity:

    def __init__(self):
        self.root = Tk()
        self.frame = None
        self.root.title("RCTools")

    def show(self):

        # Main Frame
        self.frame = ttk.Frame(self.root, width=1080, height=720, padding="3 3 12 12")
        self.frame.grid()
        self.frame.columnconfigure(0, weight=1)
        self.frame.rowconfigure(0, weight=1)

        # Create menu bar
        MenuBar(self.root)
        self.root.mainloop()

    def do_nothing(self):
        file_win = Toplevel(self.root)
        button = Button(file_win, text="Do nothing button")
        button.pack()
