import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
 
const ResizableNodeSelected = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
       <Handle type="target" position={Position.Top} style={{  background: '#8FBC8F', // Color
    width: '8px',      // Width (makes it thicker)
    height: '8px',     // Height (makes it a larger circle)
    border: '2px solid black', }}/>
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{  background: '#8FBC8F', // Color
    width: '8px',      // Width (makes it thicker)
    height: '8px',     // Height (makes it a larger circle)
    border: '2px solid black', }}/>
      {/* <Handle type="source" position={Position.Right} id="right" style={{  background: 'blue', // Color
    width: '8px',      // Width (makes it thicker)
    height: '8px',     // Height (makes it a larger circle)
    border: '2px solid black', }} /> */}
    </>
  );
};
 
export default memo(ResizableNodeSelected);