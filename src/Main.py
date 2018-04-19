import tkinter as tk
from View.MainActivity import MainActivity
from View.MenuBar.MenuBar import MenuBar

root = tk.Tk()

main = MainActivity(root)
main.pack(side="top", fill="both", expand=True)

root.title("RCTools")

MenuBar(main, root)

root.mainloop()
