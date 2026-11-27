import sqlite3

def execute(db,request_id,tenant,record,approved):
    raise NotImplementedError("Learner TODO: execute")
def main():
    db=sqlite3.connect(':memory:');db.execute('create table receipts(tenant text,request_id text,record text,primary key(tenant,request_id))')
    assert execute(db,'r1','A','A:x',False)['status']=='denied'
    assert execute(db,'r1','A','B:x',True)['status']=='denied'
    assert execute(db,'r1','A','A:x',True)['status']=='written'
    assert execute(db,'r1','A','A:x',True)['status']=='duplicate'
    assert execute(db,'r1','A','A:y',True)['status']=='conflict'
    assert db.execute('select count(*) from receipts').fetchone()[0]==1;print('5 approval/replay assertions passed')
if __name__=='__main__':main()
