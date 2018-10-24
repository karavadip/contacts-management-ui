
import Enzyme, {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ disableLifecycleMethods: true });
configure({adapter: new Adapter()});