export function reactFunctionalComponentTemplate(componentName: string) {
    return `import React from 'react';
    import styles from './${componentName}.module.css';

    interface Props {
    }

    export const ${componentName}: React.FC<Props> = ({}) => {
        return (
            <div className={styles.${componentName.toLowerCase()}}>
            </div>
        );
    };
    `.trimLeft();
};