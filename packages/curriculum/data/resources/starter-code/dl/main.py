import torch

def build_model():
    # TODO: return network producing two logits for four input features.
    raise NotImplementedError

def train_step(model, optimizer, x, y):
    # TODO: forward, loss, backward, update.
    raise NotImplementedError

if __name__=='__main__':
    assert build_model()(torch.randn(8,4)).shape==(8,2)
