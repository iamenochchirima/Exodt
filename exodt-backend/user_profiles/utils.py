import uuid

def get_random_value():
    value = str(uuid.uuid4())[:8].replace('-', '').lower()
    return value