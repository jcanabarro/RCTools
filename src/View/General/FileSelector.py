from tkinter.filedialog import askopenfilename


class FileSelector:
    def open(self):
        return askopenfilename(title="Select file", filetypes=(("jpeg files", "*.jpg"),("png files","*.png")))
