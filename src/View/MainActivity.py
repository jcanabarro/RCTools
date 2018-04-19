from tkinter import *
from tkinter import ttk
import tkinter as tk

from View.MenuBar.MenuBar import MenuBar


class MainActivity(tk.Frame):

    def __init__(self, *args, **kwargs):
        tk.Frame.__init__(self, *args, **kwargs)
        self.frame = ttk.Frame(self, width=1080, height=720, padding="3 3 12 12")
        self.frame.grid()
        self.frame.columnconfigure(0, weight=1)
        self.frame.rowconfigure(0, weight=1)

    def create_window(self):
        t = tk.Toplevel(self)
        t.wm_title("Window")
        l = tk.Label(t, text="This is window")
        l.pack(side="top", fill="both", expand=True, padx=100, pady=100)
