import pandas as pd

df2 = pd.read_csv('./final-movie.csv', index_col=0)
check = df2[['ID', 'Genres']]
check = pd.concat([check, check['Genres'].str.split(',', expand=True)], axis=1)
check.drop(['Genres'], axis=1, inplace=True)
check.to_csv('genres.csv')