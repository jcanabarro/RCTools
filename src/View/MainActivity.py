from tkinter import ttk
import tkinter as tk


class MainActivity(tk.Frame):

    def __init__(self, *args, **kwargs):
        tk.Frame.__init__(self, *args, **kwargs)
        self.frame = ttk.Frame(self, width=1080, height=720, padding="3 3 12 12")
        self.frame.grid()
        self.frame.columnconfigure(0, weight=1)
        self.frame.rowconfigure(0, weight=1)

    def create_image_window(self, image):
        top_level = tk.Toplevel(self)
        top_level.wm_title("Image")
        label = tk.Label(top_level, image=image)
        label.image = image
        label.pack(side="top", fill="both", expand=True, padx=100, pady=100)
