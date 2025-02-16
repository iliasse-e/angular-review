import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSelectHarness } from '@angular/material/select/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const OPTIONS = [
  {key:'p1', label:'option 1'},
  {key:'p2', label:'option 2'}
]

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    fixture.componentRef.setInput('options', OPTIONS); // Sets input value
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
  
  it('should show default value', async () => {
    
    // const selectElement: HTMLSelectElement = document.getElementById('select-id-element') as HTMLSelectElement;
    // expect(selectElement.selectedIndex).toBe(0);
    
    const selectHarness = await loader.getHarness(MatSelectHarness);
    const selectedValue = await selectHarness.getValueText();

    expect(selectedValue).toBe('');

  })

  it('should select the value', async () => {
        
    // const selectElement: HTMLSelectElement = document.getElementById('select-id-element') as HTMLSelectElement;

    // selectElement.value = selectElement.options[1].value;

    // selectElement.dispatchEvent(new Event('change'));

    // expect(selectElement.selectedIndex).toBe(1);

    const selectHarness = await loader.getHarness(MatSelectHarness);
    await selectHarness.open();

    const options = await selectHarness.getOptions();
    await options[1].click(); // Sélectionner la deuxième option

    const selectedValue = await selectHarness.getValueText();
    expect(selectedValue).toBe('option 2');
    
  })
});
