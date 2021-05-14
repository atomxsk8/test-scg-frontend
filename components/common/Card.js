import { Button } from 'antd';
import Fade from "react-reveal/Fade";
import useHover from '../../hook/useHover';

const Card = ({ image, name, hoverIcon, hoverText }) => {
    const [hoverRef, isHovered] = useHover();
    return (
        <div className="card" style={{ margin: 30 }} ref={hoverRef}>
            <div>
                <div className="shadow-box" style={{ 
                borderRadius: 10, 
                minHeight: 250, 
                marginBottom: 10,
                backgroundImage: `url(${image})` ,
                backgroundPosition: 'center',
                backgroundColor: '#e3e3e3',
                position: 'relative',
                overflow: 'hidden',
                pointerEvents: 'none'
                }}>
                <div className="overlay" style={{ width: '100%', height: '100%', position: 'absolute' }}/>
                {(hoverIcon || hoverText)  && isHovered && 
                    <div style={{ height: 250, display: 'flex', justifyContent:'center', alignItems:'center' }}>
                        <Fade up>
                            <Button type="primary" shape="circle" icon={hoverIcon} size="large" >{hoverText}</Button>
                        </Fade>
                    </div>
                }
            </div>
            </div>
            <h3 style={{textAlign:'center'}}>{name}</h3>
        </div>
    )
}

export default Card