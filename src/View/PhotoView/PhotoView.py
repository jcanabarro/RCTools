import tkinter as tk

class PhotoView:
    def __init__(self, root, image):
        top_level = tk.Toplevel(self)
        self.panel = tk.Label(top_level, image=image)
        self.panel.pack(side="bottom", fill="both", expand="yes")