import React, {useMemo} from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import { TagChip, TagChipText, TagChipNum } from '../../styles/tagStyle';

// "ㄱ", ["가나다", "고교구"]
const TagKeyContainer = ({target, targetList}) => {	
		const onClickTagBtn = () => {

		}
		const style = useMemo(()=> ({display:"flex", width:"100%"}),[]);
    return useObserver(()=>(
			<>
				<div style={style}>
					{targetList.map((tagName)=>{
						return (
								<TagChip onClick={onClickTagBtn} key={tagName}>
										<TagChipText>{tagName}</TagChipText>
										<TagChipNum>{TagStore.filteredTagObj[target][tagName].note_id.length}</TagChipNum>
								</TagChip>
						)
					})}
				</div>
			</>
    ));
}

export default TagKeyContainer;