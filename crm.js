(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const stages=['Enquiry','Qualification','Documents','Application','Bank Processing','Decision','Disbursement','Closure'];
  const statuses=['New','Contacted','Follow-up','Interested','Documents Pending','Submitted','Under Review','Approved','Rejected','Disbursed','Not Interested','Customer Unreachable','Closed'];
  async function myLeads(uid){
    const [a,b]=await Promise.all([
      HCAuth.db.collection('leads').where('createdByUserId','==',uid).get(),
      HCAuth.db.collection('leads').where('assignedToUserId','==',uid).get()
    ]);
    const map=new Map();[...a.docs,...b.docs].forEach(d=>map.set(d.id,{id:d.id,...d.data()}));
    return [...map.values()].sort((x,y)=>((y.updatedAt?.seconds||y.createdAt?.seconds||0)-(x.updatedAt?.seconds||x.createdAt?.seconds||0)));
  }
  async function createLead(uid,profile,data){
    const ref=HCAuth.db.collection('leads').doc();
    const leadId='EX-'+ref.id.slice(0,10).toUpperCase();
    await HCAuth.db.collection('leads').doc(leadId).set({
      leadId,customerName:data.customerName.trim(),mobile:data.mobile.replace(/\D/g,''),email:data.email.trim(),loanType:data.loanType,
      loanAmount:Number(data.loanAmount||0),purpose:data.purpose.trim(),employment:data.employment,stage:'Enquiry',status:'New',nextFollowUp:'',notes:'',
      source:profile.role==='connector'?'Connector':'Telecaller',createdByUserId:uid,createdByExecutiveId:profile.executiveId||'',assignedToUserId:uid,assignedToExecutiveId:profile.executiveId||'',
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    });
    return leadId;
  }
  async function addActivity(leadId,uid,profile,type,note){
    await HCAuth.db.collection('leadActivities').add({leadId,createdByUserId:uid,executiveId:profile.executiveId||'',type,note:String(note||'').trim(),createdAt:firebase.firestore.FieldValue.serverTimestamp()});
  }
  async function activities(leadId){const s=await HCAuth.db.collection('leadActivities').where('leadId','==',leadId).get();return s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));}
  window.HCCRM={esc,stages,statuses,myLeads,createLead,addActivity,activities};
})();
