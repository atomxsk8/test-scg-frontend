import { Button } from 'antd';
import Link from 'next/link';

const Title = ({ title = '', buttonName = '', buttonLink = '', button = null}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'center'
        }}>
              <h2>{title}</h2>
              {(!!buttonName && !!buttonLink) && 
              <Link href={buttonLink}>
                <Button type="primary">
                    {buttonName}
                </Button>
              </Link>
              }
              {
                  button
              }
        </div>
    )
}

export default Title