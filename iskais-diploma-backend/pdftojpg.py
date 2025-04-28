import os
from pdf2image import convert_from_path

# Указываем путь к корневой папке
root_folder = r'C:\Nabako\diplom\Iskais-diplom\iskais-diploma-backend\AFPITK'  # Измени на свой путь к папке AFPITK

# Указываем путь к Poppler
poppler_path = r'C:\Nabako\diplom\Iskais-diplom\iskais-diploma-backend\poppler-24.08.0\Library\bin'  # Измени на свой путь к Poppler

# Обход всех файлов в подкаталогах
for subdir, dirs, files in os.walk(root_folder):
    for file in files:
        if file.lower().endswith('.pdf'):  # Если файл — это PDF
            pdf_path = os.path.join(subdir, file)
            print(f'Конвертируем {pdf_path}')
            
            # Конвертируем PDF в изображения
            images = convert_from_path(pdf_path, 300, poppler_path=poppler_path)
            
            # Сохраняем изображения
            for i, image in enumerate(images):
                image_name = f"{os.path.splitext(file)[0]}_page_{i+1}.png"
                image_path = os.path.join(subdir, image_name)
                image.save(image_path, 'PNG')
                print(f"Сохранено изображение: {image_path}")
