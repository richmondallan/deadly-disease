import { useLocation } from 'react-router-dom';

import Card from "../../../shared/components/Card/Card";
import Tag from "../../../shared/components/Tag/Tag";
import './symptoms.css';

function Symptoms() {

    const disease = useLocation().state;

    return (
        <main className="page">
            <div className="content">
                <Card title={disease.name}>
                    <p className="symp-description">{disease.description}</p>

                    <div className="symp-tags">
                        {
                            disease.symptoms.map(s => <Tag text={s.name} />)
                        }
                    </div>
                </Card>
            </div>
        </main>
    )
}

export default Symptoms;