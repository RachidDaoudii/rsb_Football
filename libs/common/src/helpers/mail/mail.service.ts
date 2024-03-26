import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { log } from 'console';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(token: string, email: string) {
    await this.mailerService.sendMail({
      to: 'recipient@example.com',
      subject: 'Verify Email',
      text: 'This is for verify email',
      html: `
        <h1>Verify Email</h1>
        <p>Click <a href="http://localhost:3005/auth/verify-email/${email}/${token}">here</a> to verify your email</p>`,
    });
  }

  async sendProductEmail(order: any) {
    // console.log(order.orderProducts)
    const template = `<!DOCTYPE html>
    <html>
    <head>
      <title>Invoice</title>
      <style>
        /* CSS styling for the invoice */
        body {
          font-family: Arial, sans-serif;
        }
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .invoice-header h1 {
          font-size: 24px;
          margin: 0;
        }
        .invoice-details {
          margin-bottom: 30px;
        }
        .invoice-details p {
          margin: 0;
        }
        .invoice-items {
          margin-bottom: 30px;
        }
        .invoice-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .invoice-item-name {
          font-weight: bold;
        }
        .invoice-item-price {
          color: #888;
        }
        .invoice-total {
          text-align: right;
          font-weight: bold;
        }
        .img{
          width: 50px;
          height: 50px;
        }
        .product{
          display: flex;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="invoice-header">
          <h1>Invoice</h1>
        </div>
        <div class="invoice-details">
          <p>Invoice Number: <span>Order N° :${order.id}</span></p>
          <p>Date: <span>${order.createdAt}</span></p>
          <p>Customer Name: <span>${order.customerFirstName +" "+order.customerLastName }</span></p>
        </div>
        <div class="invoice-items">
        ${order.orderProducts.map((product) => {
          const {name,image,price} = product.product;
          
          return `
          <div class="invoice-item">
            <p class="invoice-item-name product"><img class="img" src="${image}" alt="${name}"/><span>${name}</span></p>
            <p class="invoice-item-price">${price}$</p>
          </div>`
        })}
        </div>
        <div class="invoice-total">
          <p>Total: <span>${order.totalAmount}$</span></p>
        </div>
      </div>
    </body>
    </html>`;

    await this.mailerService.sendMail({
      to: order.customerEmail,
      subject: 'Your Products',
      text: 'This is your products',
      html: template,
    });
    
    

  }
}
