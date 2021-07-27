
class Stock:
    def __init__(self):
        self.orders = []
        pass

    def onorder(self, o):
        # process order here
        self.orders.append(o)
        return 1

    def ls(self, args):
        # list current orders
        pass


class Order:

    def __init__(self, args):
        self.symbol = args['symbol']
        self.type = args['type']
        self.volume = args['volume']
        return 1


def create_random_orders():
    pass



# Tests


def virtualtest():
    # model real life

    stock = Stock()

    # create agents here
    # put some offers here




class Trader:
    def __init__(self):
        pass

    def print(self):
        print('self')





def testmanycounterparties():
    pass

# later add teststock.py
