from tkinter import *
from tkinter import ttk


class MainActivity:

    def __init__(self):
        self.root = Tk()
        self.frame = None
        self.root.title("RCTools")

    def show(self):
        self.frame = ttk.Frame(self.root, width=700, height=700, padding="3 3 12 12")
        self.frame.grid()
        self.frame.columnconfigure(0, weight=1)
        self.frame.rowconfigure(0, weight=1)
        self.root.mainloop()
