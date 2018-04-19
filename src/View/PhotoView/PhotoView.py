import tkinter as tk

class PhotoView:
    def __init__(self, main, image):
        window = main.create_image_window(image)
        # self.panel = tk.Label(top_level, image=image)