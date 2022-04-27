import { useNavigate } from 'react-router-dom';
import redirectConfig from './redirectConfig';
const useNavgiate2 = () => {
    const navigate = useNavigate();
    return (...rest: Array<Object>) => {
        let path = rest[0];
        const others = rest.slice(1, rest.length);
        console.log(rest, others);
        const obj = redirectConfig.find((item) => item.path === path);
        if (obj) {
            path = obj.redirect;
            console.log(`${obj.path} 被重定向到了 ${obj.redirect}`);
        }
        navigate(path, ...others);
    };
};
export default useNavgiate2;
