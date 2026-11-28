# Synthetic fixture for local scanner exercises; never deploy this function.
def unsafe_query(cursor, user_input):
    cursor.execute("SELECT " + user_input)

def parameterized_query(cursor, user_input):
    cursor.execute("SELECT name FROM demo WHERE name = ?", (user_input,))
