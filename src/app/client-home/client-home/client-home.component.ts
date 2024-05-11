import { Component, OnInit } from '@angular/core';
import { QrserviceService } from '../../share/qrservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  searchQuery: string = '';
  filteredProducts: any[] = [];
  products: any[] = [];
  urlInfo: any;
  searchQueryChanged: Subject<string> = new Subject<string>();

  constructor(private productService: QrserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchQueryChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((query: string) => !!query.trim()),
      switchMap((query: string) =>
        this.productService.getProductBySearchId(query).pipe(
          catchError(error => {
            return of(null);
          })
        )
      )
    ).subscribe((result: any) => {
      if (result !== null) {
        this.router.navigate([`/searched/${this.searchQuery}`])
      } else {
        console.log('An error occurred, but processing continues.');
      }
    });


    // Get the userId from the route parameters
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId) {
      // Fetch user-specific products
      this.productService.getProduct(userId).subscribe({
        next: (res: any) => {
          this.products = res.products; // Assuming the products are in a 'products' property in your API response.
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      // Handle the case where userId is null (e.g., show an error message or redirect)
      console.log('userId is null');
    }

    this.urlInfo = window.location.origin + 'products/:userId';
  }




  url: any = "https://www.qrcode-monkey.com/img/default-preview-qr.svg";

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target?.result;
      }
    }
  }

  filterProducts() {
    const query = this.searchQuery.trim().toLowerCase();
    console.log('Query:', query); // Log the query
    this.filteredProducts = this.products.filter((product) =>
      product.product_name.toLowerCase().includes(query)
    );
    console.log('Filtered Products:', this.filteredProducts); // Log the filtered products
  }


  onSearchInputChange() {
    this.searchQueryChanged.next(this.searchQuery.trim().toLowerCase());
  }


}
