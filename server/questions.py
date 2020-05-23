# Use Python to Insert all of the Questions
import pymongo

# Load the Questions
with open('questions.txt') as f:
    qs = f.read()
qs = qs.split('\n')
# Make a Dictionary
qlist = []
for i, q in enumerate(qs):
    qlist.append({
        'n' : i,
        'prompt' : q
    })

# Connect to Mongo and Insert Many
client = pymongo.MongoClient('mongodb+srv://admin:AAvZTEwKEE5y5uSq@gifbattle-cvvpb.gcp.mongodb.net/test?retryWrites=true&w=majority')
db = client['memebattle']
questions = db['questions']

questions.insert_many(qlist)