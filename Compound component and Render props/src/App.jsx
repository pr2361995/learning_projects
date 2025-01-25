import { Accordion } from "./components/Compound_component/Accordin/Accordion";
import { AccordionItem } from "./components/Compound_component/Accordin/AccordionItem";
import Place from "./components/Render_props/SelectList/Place";
import { PLACES } from "./components/Render_props/SelectList/places";
import SearchableList from "./components/Render_props/SelectList/SearchableList";

function App() {
  return <>
    <h1>React Patterns & Practices</h1>
    <Accordion>
      <Accordion.Item id="section-1">
        <AccordionItem.Title title="Section 1"/>
        <AccordionItem.Content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionItem.Content>
      </Accordion.Item>
      <Accordion.Item id="section-2">
        <AccordionItem.Title title="Section 2"/>
        <AccordionItem.Content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionItem.Content>
      </Accordion.Item>
    </Accordion>
    <br/>
    <SearchableList items={PLACES} getId={(item) => item.id}>
      {(item) => <Place item={item} ></Place>}
    </SearchableList>
    <SearchableList items={["Item 1","Item 2"]} getId={(item) => item}>
      {(item) => <>{item}</>}
    </SearchableList>
  </>
}

export default App;
