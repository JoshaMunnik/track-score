// region imports

import {Column} from "../../../components/styled/layout/Column.tsx";
import {modules} from "../../../modules/modules.ts";
import {CardButton} from "../../../components/styled/button/CardButton.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {useNavigate} from "react-router";

// endregion

// region exports

export function NewGameList() {
  const navigate = useNavigate();
  return (
    <Column
      alignCrossAxis={AlignItem.Center}
      gap={Spacing.Normal}
      verticalPadding={Spacing.Normal}
      width={Size.Full}
    >
      {modules.map((module) => (
        <CardButton
          onClick={() => {
            navigate(
              module.homePath,
              {
                state: {
                  data: '',
                }
              }
            );
          }}
          image={module.mainImage}
          title={module.name}
          description={module.description}
          key={module.type}
        />
      ))}
    </Column>
  )
}

// endregion