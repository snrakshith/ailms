# Neural tensor shapes and attention

For image batch N=8, channels C=3, H=W=32, Conv2d(3,16,kernel_size=3,stride=1,padding=1) outputs (8,16,32,32). A 2×2 max pool with stride 2 outputs (8,16,16,16); adaptive average pooling to 1×1 yields (8,16,1,1); flatten and Linear(16,10) produce (8,10) logits. CrossEntropyLoss accepts logits and integer class IDs, not already-softmaxed scores.

Convolution spatial output = floor((input+2padding−dilation×(kernel−1)−1)/stride+1).

## Attention shapes
For batch B, sequence T, model width D and H heads, reshape projections to (B,H,T,D/H). Scores QKᵀ have shape (B,H,T,T). Apply the causal mask to scores before softmax, then multiply by V to obtain (B,H,T,D/H). Concatenate heads and project to (B,T,D). Attention can use optimized kernels, but naive score storage scales quadratically with T.

## Gradient debugging checklist
1. Verify loss target shape and dtype; check inputs are finite.
2. Overfit a tiny batch before full training.
3. Check gradients are nonzero and finite and parameters actually update.
4. Compare training and validation loss; use eval mode for validation.
5. Review data split, learning rate, weight decay and checkpoint restoration before scaling hardware.

**Exercise:** change the sequence length in `code/D03/causal_attention.py`, verify output shape, and test that future changes do not affect earlier tokens. Explain why a causal mask is unsuitable for some bidirectional encoders.
