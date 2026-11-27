import sqlite3

def execute(db,request_id,tenant,record,approved):
    if not approved:return {'status':'denied'}
    if not isinstance(record,str) or not record.startswith(tenant+':'):return {'status':'denied'}
    # In production, authenticated tenant comes from verified session, not request input.
    with db:
        existing=db.execute('select record from receipts where tenant=? and request_id=?',(tenant,request_id)).fetchone()
        if existing:return {'status':'duplicate' if existing[0]==record else 'conflict'}
        db.execute('insert into receipts values (?,?,?)',(tenant,request_id,record))
    return {'status':'written'}
def main():
    db=sqlite3.connect(':memory:');db.execute('create table receipts(tenant text,request_id text,record text,primary key(tenant,request_id))')
    assert execute(db,'r1','A','A:x',False)['status']=='denied'
    assert execute(db,'r1','A','B:x',True)['status']=='denied'
    assert execute(db,'r1','A','A:x',True)['status']=='written'
    assert execute(db,'r1','A','A:x',True)['status']=='duplicate'
    assert execute(db,'r1','A','A:y',True)['status']=='conflict'
    assert db.execute('select count(*) from receipts').fetchone()[0]==1;print('5 approval/replay assertions passed')
if __name__=='__main__':main()
