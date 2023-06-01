import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../models/order-item';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({

  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService, private toastrService: ToastrService,) { }
  ngOnInit(): void {
    this.loadOrderItems();
  }

  loadOrderItems(): void {
    this.orderService.getOrders().subscribe(items => {
      this.orderItems = items;
    });
  }

  addOrderItem(newItem: OrderItem): void {
    this.orderService.create(newItem).subscribe(() => {
      this.loadOrderItems();
    }, error => {
      console.error('Hiba történt a megrendelés hozzáadásakor:', error);
    });
  }
  
  deleteOrderItem(itemId: number): void {
    this.orderService.deleteOrder(itemId).subscribe(() => {
      this.loadOrderItems();
      this.toastrService.success('Megrendelés sikeresen törölve!', 'Siker');
    }, error => {
      console.error('Hiba történt a megrendelés törlésekor:', error);
    });
  }
}