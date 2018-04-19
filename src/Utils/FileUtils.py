from PIL import ImageTk, Image

from View.PhotoView.PhotoView import PhotoView


class FileUtils:

    @staticmethod
    def open_picture_finder(main, path):
        img = Image.open(path)
        opened = ImageTk.PhotoImage(img)
        PhotoView(main, opened)

