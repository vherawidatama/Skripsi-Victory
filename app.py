from flask import Flask, render_template, url_for, request
import pandas as pd
import timeit
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
import re
import random
import nltk
app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")
@app.route('/key')
def key():
    return render_template("keywords.html")


@app.route('/key/result',methods=['POST', 'GET'])
def result():
    output = request.form.to_dict()
    print(output)
    keyword = output["keyword"]
    books_output = []
    print(keyword)
    start = timeit.default_timer() # catat waktu mulai

    def recommended():
        #Load & Preprocessed Data
        stopworda = StopWordRemoverFactory()
        factory = StopWordRemoverFactory()
        stopwords = factory.get_stop_words()
        books = pd.read_csv('static/script/data/Books.csv')
        books.head(5)
        books.drop_duplicates(subset='Title',keep=False,inplace=True)
        clean_spc1 = re.compile('[/(){}\[\]\|@,;]')
        clean_symbol = re.compile('[^0-9a-z #+_]')
        def clean_text(text):
            text = text.lower()
            text = clean_spc1.sub(' ', text)
            text = clean_symbol.sub('', text)
            text = ' '.join(word for word in text.split() if word not in stopwords)
            return text
        books['Title_clean'] = books['Title'].apply(clean_text)
        #Split data into features and target
        df = books[['book_id','Title']]
        vectorizer = TfidfVectorizer()
        X = vectorizer.fit_transform(books['Title_clean'])
        print(keyword)
        print(len(keyword))
        if len(keyword)<=0:
            kondisi = False
            print(kondisi)
            return "", kondisi
        else:
            kondisi = True
            print(kondisi)
            query_vec = vectorizer.transform([keyword])
            results = cosine_similarity(X,query_vec).reshape((-1,))
            for i in results.argsort()[-5:][::-1]:
                #print('\033[1m' + '\033[91m' + books.iloc[i,0] + '\033[0m')
                #print(books.iloc[i,3])
                books_output.append(books.iloc[i,3]) 
            return books_output, kondisi

    try:
        model,kondisi = recommended()
        predict = model
        predict
        print(predict)
        stop = timeit.default_timer() # catat waktu selesai
        lama_eksekusi = stop - start # lama eksekusi dalam satuan detik
        print("Lama eksekusi: ",lama_eksekusi,"detik")
        return render_template('keywords.html', rekomendasi = predict, kondisi = kondisi)
    except:
        predict = str(keyword) + " Not Found"
        kondisi = False
        return render_template('keywords.html', rekomendasi = predict, kondisi = kondisi)


if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=80)
