import {PDFDocument,StandardFonts,rgb} from 'pdf-lib';
import {PaymentOrderModel} from './billing.models.js';
import {HttpError} from '../../core/errors/http-error.js';
import {env} from '../../config/env.js';
import {publicProduct} from './billing.service.js';
export async function buildPaymentReceipt(userId:string,orderId:string){
 const order=await PaymentOrderModel.findOne({userId,orderId}).lean();
 if(!order)throw new HttpError(404,'Order not found','not_found');
 if(order.status!=='paid'||!order.paidAt)throw new HttpError(409,'Receipt is available after confirmed payment','payment_not_confirmed');
 const pdf=await PDFDocument.create();const page=pdf.addPage([595,842]);const font=await pdf.embedFont(StandardFonts.Helvetica);const bold=await pdf.embedFont(StandardFonts.HelveticaBold);
 const ink=rgb(.10,.20,.16),muted=rgb(.38,.45,.41);const out=(value:string,x:number,y:number,size=11,isBold=false,color=ink)=>page.drawText(value.replace(/[^ -~]/g,'?'),{x,y,size,font:isBold?bold:font,color,maxWidth:495});
 page.drawRectangle({x:0,y:757,width:595,height:85,color:rgb(.91,.95,.92)});
 out(env.INVOICE_SELLER_NAME,48,800,22,true);
 out('PAYMENT RECEIPT',48,773,12,true);
 out('Receipt reference',48,704,10,false,muted);out(orderId,48,684,10,true);
 out('Paid on',48,646,10,false,muted);out(new Date(order.paidAt).toISOString().slice(0,10),48,625,11,true);
 out('Item',48,563,10,false,muted);out('Amount (INR)',440,563,10,false,muted);
 page.drawLine({start:{x:48,y:551},end:{x:547,y:551},color:rgb(.83,.87,.84)});
 out(publicProduct().title,48,527,12,true);out((order.amountPaise/100).toFixed(2),452,527,12,true);
 page.drawLine({start:{x:48,y:506},end:{x:547,y:506},color:rgb(.83,.87,.84)});
 out('Total paid',48,480,12,true);out(`INR ${(order.amountPaise/100).toFixed(2)}`,435,480,12,true);
 if(env.INVOICE_SELLER_ADDRESS)out(env.INVOICE_SELLER_ADDRESS,48,431,9,false,muted);
 if(env.INVOICE_SELLER_GSTIN)out(`Seller GSTIN: ${env.INVOICE_SELLER_GSTIN}`,48,413,9,false,muted);
 out('Payment confirmed with Cashfree. Access your learning pass from your dashboard.',48,325,10,false,muted);
 out('This receipt is not a GST tax invoice. Contact the seller for a statutory tax invoice.',48,295,9,false,muted);
 out('AI Quest | Retain this receipt for your records.',48,70,9,false,muted);
 return Buffer.from(await pdf.save());
}
