import { TextDecoder, TextEncoder } from "util";
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
