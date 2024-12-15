// 'use client'
// import React, { useCallback, useRef } from 'react';


// import {
//   Background,
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
//   ReactFlowProvider,
// } from '@xyflow/react';
 
// import '@xyflow/react/dist/style.css';
// import './index.css';
 
 
// const initialNodes = [
//   {
//     id: '0',
//     type: 'input',
//     data: { label: 'Node' },
//     position: { x: 0, y: 50 },
//   },
// ];
 
// let id = 1;
// const getId = () => `${id++}`;
// const nodeOrigin = [0.5, 0];
 
// const Home = () => {
//   const reactFlowWrapper = useRef(null);
 
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const { screenToFlowPosition } = useReactFlow();
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [],
//   );
 
//   const onConnectEnd = useCallback(
//     (event, connectionState) => {
//       // when a connection is dropped on the pane it's not valid
//       if (!connectionState.isValid) {
//         // we need to remove the wrapper bounds, in order to get the correct position
//         const id = getId();
//         const { clientX, clientY } =
//           'changedTouches' in event ? event.changedTouches[0] : event;
//         const newNode = {
//           id,
//           position: screenToFlowPosition({
//             x: clientX,
//             y: clientY,
//           }),
//           data: { label: `Node ${id}` },
//           origin: [0.5, 0.0],
//         };
 
//         setNodes((nds) => nds.concat(newNode));
//         setEdges((eds) =>
//           eds.concat({ id, source: connectionState.fromNode.id, target: id }),
//         );
//       }
//     },
//     [screenToFlowPosition],
//   );
 
//   return (
//     <div className="wrapper" ref={reactFlowWrapper}>
//       <ReactFlow
//         style={{ backgroundColor: "#F7F9FB" }}
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onConnectEnd={onConnectEnd}
//         fitView
//         fitViewOptions={{ padding: 2 }}
//         nodeOrigin={nodeOrigin}
//     >
//       <Background  />
//     </ReactFlow>
//     </div>
//   );
// };
 
// export default () => (
//   <ReactFlowProvider>
//     <Home />
//   </ReactFlowProvider>
// );







// 'use client';
// import React, { useCallback, useRef,useState } from 'react';
// import {
//   Background,
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
//   ReactFlowProvider,
//   BezierEdge,
// } from '@xyflow/react';

// import ResizableNodeSelected from './ResizableNodeSelected';
// import { AnimatedSVGEdge } from './AnimatedSVGEdge';
// import CustomNode from './CustomNode';
// import 'react-resizable/css/styles.css'; // Stil dosyası
// import '@xyflow/react/dist/style.css';
// import './index.css';
// import ConnectionLine from './ConnectionLine';
// import ButtonEdge from './ButtonEdge';

// // Başlangıç düğümleri
// const initialNodes = [
//   {
//     id: '0',
//     type: 'ResizableNodeSelected', // Custom Node türü
//     data: { label: 'NodeResizer when selected' },
//     position: { x: -100, y: -200 },
//   },
//   {
//     id: '1',
//     type: 'buttonedge',// Custom Node türü
//     data: { label: 'NodeResizer when selected' },
//     position: { x: 100, y: 200 },
//   },
//   {
//     id: '2',
//     type: 'custom',
//     data: { name: 'Kristi Price', job: 'Developer', emoji: '' },
//     position: { x: 200, y: 200 },
//   },
// ];

// // Başlangıç kenarları
// const initialEdges = [
//   { id: '0->1', source: '0', target: '1' }, // "type" belirtilmesine gerek yok
// ];

// // Node ve Edge türlerini tanımlama
// const nodeTypes = {

//   custom: CustomNode,
//   ResizableNodeSelected,


 
// };

// const edgeTypes = {
//     animatedSvg: AnimatedSVGEdge, // Tüm kenarlar için varsayılan olacak
//     buttonedge: ButtonEdge,
 

// };

// const getId = () => `node_${+new Date()}`;
// const nodeOrigin = [0.5, 0];
// const Home = () => {
//   const reactFlowWrapper = useRef(null);

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const { screenToFlowPosition ,getNode} = useReactFlow();
//   const [selectedNodeId, setSelectedNodeId] = useState(null);

 

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge({ ...params, type: 'animatedSvg' }, eds) // Varsayılan kenar türü ekleniyor
//       ),
//     []
//   );
 

//   const onNodeClick = useCallback(
//     (event, node) => {
//       setSelectedNodeId(node.id); // Set selected node ID
//     },
//     []
//   );

//   const onConnectEnd = useCallback(
//     (event, connectionState) => {
//       if (!connectionState.isValid) {
//         const id = getId();
//         const { clientX, clientY } =
//           'changedTouches' in event ? event.changedTouches[0] : event;
//         const newNode = {
//           id,
//           type: 'ResizableNodeSelected',
//           position: screenToFlowPosition({
//             x: clientX,
//             y: clientY,
//           }),
//           data: { label: `Node ${id}` },
//           origin: [0.5, 0.0],
//         };

//         setNodes((nds) => nds.concat(newNode));
//         setEdges((eds) =>
//           eds.concat({
//             id,
//             source: connectionState.fromNode.id,
//             target: id,
//             type: 'animatedSvg', // Varsayılan tür ekleniyor
//           })
//         );
//       }
//     },
//     [screenToFlowPosition]
//   );

//   return (
//     <div className="wrapper" ref={reactFlowWrapper}>
//       <ReactFlow
//         style={{ backgroundColor: '#FFE4C4' }}
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         snapToGrid={true}
//         onConnectEnd={onConnectEnd}
//         onNodeClick={onNodeClick}
//         connectionLineComponent={ConnectionLine}
//         fitView
//         fitViewOptions={{ padding: 2 }}
//         nodeOrigin={nodeOrigin}
//         nodeTypes={nodeTypes} // Custom Node türleri
//         edgeTypes={edgeTypes} // Custom Edge türleri
//         defaultEdgeOptions={{
//           type: 'animatedSvg', // Tüm kenarlar için varsayılan tür
//         }}
//       >
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };

// export default () => (
//   <ReactFlowProvider>
//     <Home />
//   </ReactFlowProvider>
// );




"use client";

import React, { useState, useEffect ,useCallback ,useRef} from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // Heroicons ikonları

import { AiOutlineSave, AiOutlineDelete, AiOutlineDownload } from 'react-icons/ai'; // React Icons'dan ikonlar
import { FaSave } from "react-icons/fa";
import { BiSolidFilePng } from "react-icons/bi";
import { FcAddRow } from "react-icons/fc";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FcDeleteRow } from "react-icons/fc";
import { RxUpdate } from "react-icons/rx";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";
 





import  {ReactFlow,
  addEdge,
  MiniMap,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Handle,
  NodeProps,
 
  Position,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import html2canvas from "html2canvas"; // html2canvas import ediyoruz
import '@xyflow/react/dist/style.css';


import { AnimatedSVGEdge } from './AnimatedSVGEdge';
import ResizableNodeSelected from '../map/ResizableNodeSelected';

import CustomNode from '../map/CustomNode';
import 'react-resizable/css/styles.css'; // CSS for resizable nodes
import '@xyflow/react/dist/style.css';
import './index.css';
import ConnectionLine from '../map/ConnectionLine';
import ButtonEdge from '../map/ButtonEdge';
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";




const MindMapPage = () => {

  const initialNodes = [
    { id: '0', type: 'ResizableNodeSelected', data: { label: 'NodeResizer when selected' }, position: { x: -100, y: -200 } },
    { id: '1', type: 'ResizableNodeSelected', data: { label: 'NodeResizer when selected' }, position: { x: 100, y: 200 } },
   
  ];
  
  const initialEdges = [
    { id: '0->1', source: '0', target: '1' },
  ];
  const nodeTypes = {
    custom: CustomNode,
    ResizableNodeSelected,
  };
  
  const edgeTypes = {
    animatedSvg: AnimatedSVGEdge,
    buttonedge: ButtonEdge,
  };
  
  const getId = () => `node_${+new Date()}`;
  const nodeOrigin = [0.5, 0];
 



  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getNode } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );




 

  
  const [isOpen, setIsOpen] = useState(false);
 
  const [editingLabel, setEditingLabel] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<string>("none");
  const [nodeContent, setNodeContent] = useState<string>("");
 
 
 
 

 




  
  const togglePanel = () => setIsOpen(!isOpen);

  const ThemeToggle = () => {
    const [theme, setTheme] = useState<string>("light");
  
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }, []);

    
 
  
    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-800 dark:bg-gray-800"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <MoonIcon className="h-6 w-6 text-gray-50" />
        ) : (
          <SunIcon className="h-6 w-6 text-gray-50" style={{backgroundColor:''}}/>
        )}
      </button>
    );
  };
  

  const saveMindMap = () => {
    const mindMapData = { nodes, edges };
    localStorage.setItem("mindMapData", JSON.stringify(mindMapData));
    alert("Zihin haritası kaydedildi!");
  };

  const loadMindMap = () => {
    const savedMindMap = localStorage.getItem("mindMapData");
    if (savedMindMap) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedMindMap);
      setNodes(savedNodes);
      setEdges(savedEdges);
    } else {
      alert("Kaydedilmiş bir zihin haritası bulunamadı.");
    }
  };



;


  const onConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        const id = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          type: 'ResizableNodeSelected',
          position: screenToFlowPosition({ x: clientX, y: clientY }),
          data: { label: ` ` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectionState.fromNode.id,
            target: id,
            type: 'animatedSvg',
          })
        );
      }
    },
    [screenToFlowPosition]
  );

 
  
  // Silinen düğüm ve kenarları saklamak için state
  const [deletedNodes, setDeletedNodes] = useState([]);
  const [deletedEdges, setDeletedEdges] = useState([]);
 


  const handleDeleteNode = () => {
    if (!selectedNodeId) return alert("Lütfen bir düğüm seçin.");

    // Silinen düğüm ve kenarları kaydet
    const deletedNode = nodes.find((node) => node.id === selectedNodeId);
    const relatedEdges = edges.filter(
      (edge) => edge.source === selectedNodeId || edge.target === selectedNodeId
    );

    setDeletedNodes((prev) => [...prev, deletedNode]);
    setDeletedEdges((prev) => [...prev, ...relatedEdges]);

    // Düğüm ve ilişkili kenarları sil
    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNodeId && edge.target !== selectedNodeId
      )
    );
    setSelectedNodeId(null);
  };

  const handleUndoDelete = () => {
    if (deletedNodes.length === 0) return alert("Geri alınacak bir işlem yok.");

    // Son silinen düğümü ve ilişkili kenarları geri yükle
    const lastDeletedNode = deletedNodes[deletedNodes.length - 1];
    const relatedEdges = deletedEdges.filter(
      (edge) =>
        edge.source === lastDeletedNode.id || edge.target === lastDeletedNode.id
    );

    setNodes((prev) => [...prev, lastDeletedNode]);
    setEdges((prev) => [...prev, ...relatedEdges]);

    // Geri yüklenen düğüm ve kenarları silinenlerden çıkar
    setDeletedNodes((prev) => prev.slice(0, -1));
    setDeletedEdges((prev) =>
      prev.filter(
        (edge) =>
          edge.source !== lastDeletedNode.id &&
          edge.target !== lastDeletedNode.id
      )
    );
  };

  



  const handleUpdateNodeLabel = () => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: editingLabel } }
          : node
      )
    );
    setEditingLabel("");
  };

  const handleUpdateNodeCategory = () => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: { ...node.data, category: editingCategory },
              style: {
                ...node.style,
                backgroundColor:
                  editingCategory === "none"
                    ? "#ffdead"
                    : editingCategory === "ton1"
                    ? "#d2b48c"
                    : editingCategory === "ton2"
        ? "#c8ad7f"
        : editingCategory === "ton3"
        ? "#a67b5b"
        : editingCategory === "ton4"
        ? "#daa520"
        : editingCategory === "ton5"
        ? "#f5deb3"
        : editingCategory === "ton6"
        ? "#6f4e37"
        : editingCategory === "ton7"
        ? "#986960"
        : editingCategory === "ton8"
        ? "#d2691e"
        : editingCategory === "ton9"
        ? "#e3a869"
        : editingCategory === "ton10"
        ? "#8b4513"
        : "#ffffff",
                    
              },
            }
          : node
      )
    );
  };
 
  

  const handleUpdateNodeContent = () => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, content: nodeContent } }
          : node
      )
    );
    setNodeContent("");
  };

  const saveAsPng = () => {
    const flowElement = document.getElementById("react-flow-wrapper");
    if (flowElement) {
      html2canvas(flowElement, { backgroundColor: "white" })
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "mindmap.png";
          link.click();
        })
        .catch((error) => {
          console.error("PNG kaydedilirken hata oluştu:", error);
        });
    }
  };
 

  useEffect(() => {
    loadMindMap();
  }, []);

  return (
    <div style={{ color: "var(--foreground)", background: "var(--background)" }}className="h-screen p-8">
       <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Zihin Haritası</h1> */}
        <ThemeToggle />
      </div>



     
      <div className="mb-4">
        <button
          onClick={saveMindMap}
           title="Kaydet"
          className="p-2 rounded mr-2"   style={{  position: 'absolute', top: '32px', left: '100px' }}    >
           
          <FaSave className="mr-2" style={{ color: '#668b8b', fontSize:"24px",padding:'0.1rem' }} /> 
        </button>
       
        <button
          onClick={saveAsPng}  title="Zihin Haritasını İndir"
          
          className="p-2  ml-2 "style={{  position: 'absolute', top: '32px', left: '170px' }}
          
        >
          <BiSolidFilePng className="ml-2" style={{ color: '#668b8b', fontSize:"24px",padding:'0.1rem' }}/>
          
        </button>
      </div>
      <div style={{ display: 'flex' }}>

     


      <div style={{ height: "80%", border: "1px solid #ccc",backgroundColor:'#e5e7eb',width:"74%" }}
        id="react-flow-wrapper"
      
        
      
      ><ReactFlow 
          nodes={nodes}
          edges={edges}
          
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          snapToGrid={true}
          onConnectEnd={onConnectEnd}
        
          connectionLineComponent={ConnectionLine}
          defaultEdgeOptions={{ type: 'animatedSvg' }}
          fitView
          nodeOrigin={nodeOrigin}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          style={{ backgroundColor: "#F7F9FB" }}
          fitViewOptions={{ padding: 2 }}
        
          onNodeClick={(event, node) => {
                         setSelectedNodeId(node.id);
                         setEditingLabel(node.data.label);
                         setEditingCategory(node.data.category);
                        setNodeContent(node.data.content);
                      }}
           
        >
          <Background />
          <Controls />
        </ReactFlow> 
      </div>
      <div
      className="mt-4"
      style={{
        marginTop: "5.5rem",
        position: "absolute",
        top: "0",
        right: "0",
        padding: "15px",
        marginRight: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "300px",
        transition: "all 0.3s ease-in-out",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{
            fontWeight: "700",
            fontSize: "1.4rem",
            textAlign: "center",
            marginBottom: "10px",
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
          }}
          className="font-semibold"
        >
          Düğüm Ayarları
        </h3>
        <button
          onClick={togglePanel}
          className="text-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#668b8b",
            fontSize: "20px",
          }}
        >
          {isOpen ? (
            <FiChevronUp style={{ fontSize: "20px", color: "#668b8b" }} />
          ) : (
            <FiChevronDown style={{ fontSize: "20px", color: "#668b8b" }} />
          )}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* Yeni Düğüm Adı */}
          <div className="mb-4">
            <label
              className="block mb-2"
              style={{
                fontSize: "1rem",
                color: "#555",
                fontWeight: "500",
              }}
            >
              Yeni Düğüm Adı:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={editingLabel}
                onChange={(e) => setEditingLabel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mr-2"
                style={{
                  fontSize: "1rem",
                  color: "#4B0082",
                  fontFamily: "'Arial', sans-serif",
                  backgroundColor:"#e5e7eb",
                }}
              />
              <button
                onClick={handleUpdateNodeLabel}
                title="Güncelle"
                className="p-2 text-white rounded"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ccc",
                }}
              >
                <MdOutlineDownloadDone className="mr-2" style={{ color: "#668b8b" }} />
              </button>
            </div>
          </div>

          {/* Renk Seçimi */}
          <div className="mb-4">
            <label
              className="block mb-2"
              style={{
                fontSize: "1rem",
                color: "#555",
                fontWeight: "500",
            
              }}
            >
              Renk:
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={editingCategory}
                onChange={(e) => setEditingCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mr-2"
                style={{
                  fontSize: "1rem",
                  fontFamily: "'Arial', sans-serif",
                  color: "#333",
                  backgroundColor:"#e5e7eb",
                }}
              >
                <option value="none">Beyaz</option>
  <option value="ton1">Açık Kahve</option>
  <option value="ton2">Orta Kahve</option>
  <option value="ton3">Koyu Kahve</option>
  <option value="ton4">Karamel</option>
  <option value="ton5">Latte</option>
  <option value="ton6">Espresso</option>
  <option value="ton7">Kestane</option>
  <option value="ton8">Tarçın</option>
  <option value="ton9">Kum Kahvesi</option>
  <option value="ton10">Toprak</option>
</select>
<div
  className="w-8 h-8 rounded"
  style={{
    backgroundColor:
      editingCategory === "none"
        ? "#ffdead"
        : editingCategory === "ton1"
        ? "#d2b48c"
        : editingCategory === "ton2"
        ? "#c8ad7f"
        : editingCategory === "ton3"
        ? "#a67b5b"
        : editingCategory === "ton4"
        ? "#daa520"
        : editingCategory === "ton5"
        ? "#f5deb3"
        : editingCategory === "ton6"
        ? "#6f4e37"
        : editingCategory === "ton7"
        ? "#986960"
        : editingCategory === "ton8"
        ? "#d2691e"
        : editingCategory === "ton9"
        ? "#e3a869"
        : editingCategory === "ton10"
        ? "#8b4513"
        : "#ffffff",
    border: "1px solid #ccc",
  }}
              />
              <button
                onClick={handleUpdateNodeCategory}
                title="Güncelle"
                className="p-2 text-white rounded"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ccc",
                }}
              >
                <MdOutlineDownloadDone className="mr-2" style={{ color: "#668b8b" }} />
              </button>
            </div>
          </div>

        





          {/* Notlar */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: "1rem",
                color: "#555",
                fontWeight: "500",
               
              }}
            >
              Notlar:
            </label>
            <div className="flex items-start mb-4">
              <textarea
                value={nodeContent}
                onChange={(e) => setNodeContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mr-2"
                style={{
                  flex: "1",
                  minHeight: "100px",
                  fontSize: "1rem",
                  fontFamily: "'Arial', sans-serif",
                  color: "#333",
                  backgroundColor:"#e5e7eb"
                }}
              ></textarea>
              <button
                onClick={handleUpdateNodeContent}
                title="Güncelle"
                className="p-2 text-white rounded"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ccc",
                }}
              >
                <MdOutlineDownloadDone className="mr-2" style={{ color: "#668b8b" }} />
              </button>
            </div>
          </div>
          <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <button onClick={handleDeleteNode}>
    <FcDeleteRow
      className="p-2"
      style={{ color: '#668b8b', fontSize: '25px', padding: '0.1rem' }}
    />
  </button>
  <button onClick={handleUndoDelete}>
    <RiArrowGoBackLine
      className="p-2"
      style={{ color: '#668b8b', fontSize: '25px', padding: '0.1rem' }}
    />
  </button>
</div>

    </div>
    

   
    </div>

         
          
     




       
        
         
     
      
        
      )}
       </div>
       </div>
       </div>
  
 
 
 


  )
};
export default () => (
  <ReactFlowProvider>
    <MindMapPage />
  </ReactFlowProvider>
);




