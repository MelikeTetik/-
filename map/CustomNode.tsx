
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: '10px',
        border: '2px solid #0073ff',
        borderRadius: '8px',
        background: '#fff',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Handle - Top */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{
          background: 'blue',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          top: '-5px',
        }}
      />

      {/* Handle - Left */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{
          background: 'green',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          left: '-5px',
        }}
      />

      {/* Node Label */}
      <div>{data.label}</div>

      {/* Handle - Right */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          background: 'orange',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          right: '-5px',
        }}
      />

      {/* Handle - Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{
          background: 'red',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          bottom: '-5px',
        }}
      />
    </div>
  );
};

export default CustomNode;
