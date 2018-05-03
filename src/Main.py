import tkinter as tk
from tkinter import ttk
from tkinter.filedialog import askopenfilename

from PIL import ImageTk, Image


def open():
    return askopenfilename(title="Select file", filetypes=(("jpeg files", "*.jpg"), ("png files", "*.png")))

def open_file_selector():
    file_name = open()
    if (file_name):
        img = ImageTk.PhotoImage(Image.open(file_name))
        canvas.create_image(20, 20, anchor=tk.NW, image=img)

def do_nothing():
    print("No")


root = tk.Tk()

main = tk.Frame(root)
main.frame = ttk.Frame(main, width=1080, height=720, padding="3 3 12 12")
main.frame.grid()
main.frame.columnconfigure(0, weight=1)
main.frame.rowconfigure(0, weight=1)

main.pack(side="top", fill="both", expand=True)
root.title("RCTools")

# MenuBar(main, root)

menu_bar = tk.Menu(root)

file_menu = tk.Menu(root, tearoff=0)
file_menu.add_command(label="New", command=do_nothing)
file_menu.add_command(label="Open", command=open_file_selector)
file_menu.add_command(label="Save", command=do_nothing)
file_menu.add_command(label="Save as...", command=do_nothing)
file_menu.add_command(label="Close", command=do_nothing)
file_menu.add_separator()
file_menu.add_command(label="Exit", command=do_nothing)

edit_menu = tk.Menu(menu_bar, tearoff=0)
edit_menu.add_command(label="Undo", command=do_nothing)
edit_menu.add_separator()
edit_menu.add_command(label="Cut", command=do_nothing)
edit_menu.add_command(label="Copy", command=do_nothing)
edit_menu.add_command(label="Paste", command=do_nothing)
edit_menu.add_command(label="Delete", command=do_nothing)
edit_menu.add_command(label="Select All", command=do_nothing)

help_menu = tk.Menu(menu_bar, tearoff=0)
help_menu.add_command(label="Help Index", command=do_nothing)
help_menu.add_command(label="About...", command=do_nothing)

menu_bar.add_cascade(label="File", menu=file_menu)
menu_bar.add_cascade(label="Edit", menu=edit_menu)
menu_bar.add_cascade(label="Help", menu=help_menu)

root.config(menu=menu_bar)

canvas = tk.Canvas(root, width=300, height=300)

root.mainloop()
