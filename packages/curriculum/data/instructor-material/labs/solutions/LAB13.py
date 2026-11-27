import csv
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[2]
def main():
    with (ROOT/'datasets/retail-demand.csv').open() as f:y=np.array([float(r['units']) for r in csv.DictReader(f)])
    horizon=7; scores=[]
    for cutoff in (63,70,77):
        train=y[:cutoff];actual=y[cutoff:cutoff+horizon]; assert len(actual)==horizon
        seasonal=train[-horizon:];mean=np.repeat(train[-28:].mean(),horizon)
        scores.append({'cutoff':cutoff,'seasonal_MAE':float(np.abs(actual-seasonal).mean()),'mean_MAE':float(np.abs(actual-mean).mean())})
    print(scores);assert all(s['seasonal_MAE']>=0 for s in scores)
if __name__=='__main__':main()
