# Harness

[Documentation](https://material.angular.dev/guide/using-component-harnesses)

### Goals :    
- Harnesses make tests easier to read and understand with straightforward APIs.
- Harnesses make tests more robust and less likely to break when updating Angular Material.

### Getting started :

```typescript
import {HarnessLoader} from '@angular/cdk/testing'; // The foundation for all test harnesses lives there
```

From the `HarnessEnvironment`, you can get a `HarnessLoader` instance,
which you will use to load Angular Material component harnesses.


### Loading an Angular Material harness 

```typescript
let loader: HarnessLoader;
```

```typescript
  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [ChildComponent]
    });

    // This code creates a fixture for ChildComponent and then creates a HarnessLoader for that fixture.
    fixture = TestBed.createComponent(ChildComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    // The HarnessLoader can then locate Angular Material components inside ChildComponent and create harnesses for them
  })
```
````typescript
  describe('When launch', () => {
    it('should work', async () => {
      // The HarnessLoader provides two methods that can be used to load harnesses, getHarness and getAllHarnesses

      const firstInput = await loader.getHarness(MatInputHarness); // gets a harness for the first instance of the matching component
      const inputs = await loader.getAllHarnesses(MatInputHarness); // gets a list of harnesses, one for each instance of the corresponding component
    });

    // You can load harnesses for a sub-section of the DOM within ChildComponent with the getChildLoader method on HarnessLoader
    it('should work', async () => {
      // For example, say that we know ChildComponent has a div, <div class="footer">, and we want the button inside that specific <div>.
      const footerLoader = await loader.getChildLoader('.footer');
      const footerInput = await footerLoader.getHarness(MatInputHarness);

      // can also use the static with method implemented on all Angular Material component :
      // Harness for mat-input whose id is 'firstname'.
      const firstname = await loader.getHarness(MatInputHarness.with({selector: '#firstname'}));
    });
  })
```
