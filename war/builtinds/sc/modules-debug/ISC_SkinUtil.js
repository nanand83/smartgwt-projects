/*

  SmartClient Ajax RIA system
  Version v12.1p_2020-05-06/EVAL Deployment (2020-05-06)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

if(window.isc&&window.isc.module_Core&&!window.isc.module_SkinUtil){isc.module_SkinUtil=1;isc._moduleStart=isc._SkinUtil_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'SkinUtil load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime');
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM;
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.defineClass("SkinUtil");
isc.A=isc.SkinUtil;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.testPanes={};
isc.A.colorArrays=["background","color","border","borderTop","borderLeft","borderBottom","borderRight"];
isc.A.skinColorWindowDefaults={
        _constructor:"Window",
        autoDraw:false,
        autoCenter:true,
        overflow:"visible",
        canDragResize:true,
        title:"Palette Tools",
        colorEditorDefaults:{
            _constructor:"SkinPaletteTools"
        },
        bodyProperties:{overflow:"visible"},
        draw:function(){
            this.Super("draw",arguments);
            this.addAutoChild("colorEditor");
            this.body.addMember(this.colorEditor);
        }
    };
isc.B.push(isc.A.toHexString=function isc_c_SkinUtil_toHexString(color){
        var result=new isc.tinycolor(color);
        if(result.isValid())return result.toHexString();
        else return"";
    }
,isc.A.getSkinColor=function isc_c_SkinUtil_getSkinColor(color){
        return new isc.tinycolor(color);
    }
,isc.A.createDataSources=function isc_c_SkinUtil_createDataSources(){
        var data=isc.clone(isc.Canvas._currentColorMap);
        var msg="";
        var searchData=[];
        for(var i=0;i<data.length;i++){
            var color=data[i];
            color.backgroundCount=color.background.length;
            color.colorCount=color.color.length;
            color.borderCount=color.border.length;
            color.borderTopCount=color.borderTop.length;
            color.borderLeftCount=color.borderLeft.length;
            color.borderBottomCount=color.borderBottom.length;
            color.borderRightCount=color.borderRight.length;
            var skinColor=isc.tinycolor(color.original);
            isc.addProperties(color,skinColor);
            msg+="\n"+color.original+
                " background: "+color.backgroundCount+
                ", font-color: "+color.colorCount+
                ", border: "+color.borderCount+
                ", borderTop: "+color.borderTopCount+
                ", borderLeft: "+color.borderLeftCount+
                ", borderBottom: "+color.borderBottomCount+
                ", borderRight: "+color.borderRightCount
            ;
            var maxType=0;
            var colorArrays=isc.SkinUtil.colorArrays;
            for(var j=0;j<colorArrays.length;j++){
                var typeCount=color[colorArrays[j]+"Count"];
                if(typeCount>maxType){
                    maxType=typeCount;
                    if(colorArrays[j].contains("border")){
                        color.mostlyType="Borders";
                    }else if(colorArrays[j].contains("background")){
                        color.mostlyType="Backgrounds";
                    }else{
                        color.mostlyType="Fonts";
                    }
                }
            }
            searchData.add(color);
        }
        isc.DataSource.create({
            ID:"colorSearchDS",
            clientOnly:true,
            fields:[
                {name:"original",primaryKey:true},
                {name:"current"},
                {name:"isSkinCSS",type:"boolean"},
                {name:"background",multiple:true},
                {name:"color",multiple:true},
                {name:"border",multiple:true},
                {name:"borderTop",multiple:true},
                {name:"borderLeft",multiple:true},
                {name:"borderBottom",multiple:true},
                {name:"borderRight",multiple:true},
                {name:"backgroundCount",type:"integer"},
                {name:"colorCount",type:"integer"},
                {name:"borderCount",type:"integer"},
                {name:"borderTopCount",type:"integer"},
                {name:"borderLeftCount",type:"integer"},
                {name:"borderBottomCount",type:"integer"},
                {name:"borderRightCount",type:"integer"},
                {name:"mostlyType"},
                {name:"red",type:"integer"},
                {name:"green",type:"integer"},
                {name:"blue",type:"integer"},
                {name:"hue",type:"integer"},
                {name:"sat",type:"integer"},
                {name:"lightness",type:"integer"},
                {name:"lab",type:"number"}
            ],
            cacheData:searchData
        });
        isc.SkinUtil.colorSearchDS=isc.DS.get("colorSearchDS");
    }
,isc.A.showSkinPaletteTools=function isc_c_SkinUtil_showSkinPaletteTools(refreshPalette){
        if(refreshPalette||!isc.Canvas._currentColorMap)isc.Canvas.getSkinColors();
        if(isc.SkinUtil._skinColorWindow==null){
            isc.SkinUtil._skinColorWindow=isc.Window.create(isc.SkinUtil.skinColorWindowDefaults);
        }
        var win=isc.SkinUtil._skinColorWindow;
        win.setTitle("Palette Tools - "+isc.getCurrentSkinName());
        win.show();
        return win;
    }
,isc.A.getClosestColors=function isc_c_SkinUtil_getClosestColors(color,maxDistance){
        var SU=isc.SkinUtil,
            ds=SU.colorSearchDS,
            data=ds.cacheData,
            results=[]
        ;
        if(!maxDistance)maxDistance=10;
        for(var i=0;i<data.length;i++){
            var otherColor=data[i].current;
            if(color==otherColor)continue;
            var diff=SU.colorDistance(color,otherColor);
            if(diff<=maxDistance){
                results.add(data[i]);
            }
        }
        return results;
    }
,isc.A.colorDistance=function isc_c_SkinUtil_colorDistance(color1,color2){
        var skinColor1=isc.tinycolor(color1);
        var skinColor2=isc.tinycolor(color2);
        var rmean=(skinColor1.r+skinColor2.r)/2;
        var r=skinColor1.r-skinColor2.r;
        var g=skinColor1.g-skinColor2.g;
        var b=skinColor1.b-skinColor2.b;
        return Math.sqrt((((512+rmean)*r*r)>>8)+4*g*g+(((767-rmean)*b*b)>>8));
    }
,isc.A.getContrastYIQ=function isc_c_SkinUtil_getContrastYIQ(hexcolor){
        var r=parseInt(hexcolor.substr(0,2),16);
        var g=parseInt(hexcolor.substr(2,2),16);
        var b=parseInt(hexcolor.substr(4,2),16);
        var yiq=((r*299)+(g*587)+(b*114))/1000;
        return(yiq>=128)?'black':'white';
    }
);
isc.B._maxIndex=isc.C+7;

isc.defineClass("SkinColorPalette","Canvas");
isc.A=isc.SkinColorPalette.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.overflow="visible";
isc.A.titleLabelDefaults={
        _constructor:"Canvas",
        autoDraw:true,
        autoSize:true,
        wrap:false,
        height:20,
        overflow:"visible"
    };
isc.B.push(isc.A.initWidget=function isc_SkinColorPalette_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("titleLabel");
        this.addChild(this.titleLabel);
        if(this.title)this.titleLabel.setContents(this.title);
        this.titleLabel.redraw();
        this.drawColors();
    }
,isc.A.selectColor=function isc_SkinColorPalette_selectColor(color){
        var canvas=null;
        if(this.selectedCanvas){
            this.selectedCanvas.setProperty("border","2px solid "+this.selectedCanvas.color);
        }
        for(var i=0;i<this.children.length;i++){
            if(this.children[i].isColorCanvas&&this.children[i].color==color){
                this.selectedCanvas=this.children[i];
                this.selectedCanvas.setProperty("border","2px solid white");
                break;
            }
        }
    }
,isc.A.drawColors=function isc_SkinColorPalette_drawColors(colors){
        if(this.children){
            for(var i=this.children.length-1;i>0;i--){
                var canvas=this.children[i];
                if(canvas.isColorCanvas){
                    this.removeChild(canvas);
                    canvas.destroy();
                    canvas=null;
                }
            }
        }
        colors=colors||this.colors||isc.Canvas._currentColorMap.findAll({isSkinCSS:true});
        colors.setSort([
            {property:"original",direction:"ascending"}
        ]);
        var labelHeight=this.titleLabel.getHeight();
        var top=0,left=0;
        var row=0,col=0;
        for(var i=0;i<colors.length;i++){
            if(col==10){
                col=0;
                row++
            }
            var canvas=this.getColorCanvas(colors[i].original);
            this.addChild(canvas)
            canvas.moveTo(col*20,labelHeight+(row*20));
            col++;
        }
    }
,isc.A.getColorCanvas=function isc_SkinColorPalette_getColorCanvas(color){
        return isc.Canvas.create({
            width:20,height:20,
            color:color,
            isColorCanvas:true,
            autoDraw:false,
            border:"2px solid "+color,
            backgroundColor:color,
            prompt:color
        });
    }
);
isc.B._maxIndex=isc.C+4;

isc.defineClass("ColorConverter","VLayout");
isc.A=isc.ColorConverter.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.width=270;
isc.A.height=180;
isc.A.overflow="auto";
isc.A.autoDraw=true;
isc.A.formDefaults={
        _constructor:"DynamicForm",
        colWidths:[100,150],
        fields:[
            {name:"inputColor",width:"*",
                changed:function(form,item,value){
                    form.creator.setColor(value);
                }
            },
            {name:"changeTo",editorType:"ColorItem",title:"Change To",width:"*",
                changed:function(form,item,value){
                    form.creator.changeColor(form.getValue("Hex"),value);
                }
            },
            {name:"Hex",editorType:"ColorItem",width:"*"},
            {name:"Name",width:"*"},
            {name:"Rgb",width:"*"},
            {name:"Hsl",width:"*"},
            {name:"Hwb",width:"*"},
            {name:"Cmyk",width:"*"}
        ]
    };
isc.B.push(isc.A.initWidget=function isc_ColorConverter_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("form");
        this.addMember(this.form);
        if(this.color)this.setColor(this.color);
    }
,isc.A.setColor=function isc_ColorConverter_setColor(color){
        this.inputColor=color;
        this.color=isc.tinycolor(color);
        this.updateForm();
    }
,isc.A.changeColor=function isc_ColorConverter_changeColor(oldColor,newColor){
        var props={};
        props[oldColor]=newColor;
        isc.Canvas.changeSkinColors(props);
        this.creator.changeConfigColor(oldColor,newColor);
    }
,isc.A.updateForm=function isc_ColorConverter_updateForm(){
        var c=this.color;
        if(c.valid){
            var hexColor=c.toHexString();
            var skinColor=isc.Canvas._currentColorMap.find("original",hexColor);
            this.form.setValues({
                "inputColor":this.inputColor,
                "Hex":hexColor,
                "changeTo":skinColor?skinColor.current:hexColor,
                "Name":c.toName(),
                "Rgb":c.toRgbString(),
                "Hsl":c.toHslString(),
                "Hwb":c.toHwbString(),
                "Cmyk":c.toCmykString()
            });
        }else{
            this.form.setValues({"inputColor":this.inputColor});
        }
    }
);
isc.B._maxIndex=isc.C+4;

isc.defineClass("SkinPaletteTools","HLayout");
isc.A=isc.SkinPaletteTools.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.membersMargin=5;
isc.A.layoutMargin=5;
isc.A.leftPaneDefaults={
        _constructor:"VLayout",
        membersMargin:5
    };
isc.A.gridDefaults={
        _constructor:"ListGrid",
        height:400,
        headerHeight:56,
        dataSource:"colorSearchDS",
        autoFetchData:true,
        autoFitData:"horizontal",
        autoFitFieldWidths:true,
        autoFitWidthApproach:"both",
        getCellCSSText:function(record,rowNum,colNum){
            return"background-color: "+record.original+";"
        },
        canHover:true,
        showHover:true,
        cellHoverHTML:function(record,rowNum,colNum,defaultValue){
            if(colNum>2)return record[this.creator.colorArrays[colNum-3]].join("\n");
            return defaultValue;
        },
        fields:[
            {name:"original",title:"Original",width:100},
            {name:"isSkinCSS",type:"boolean",title:"From Skin"},
            {name:"mostlyType",editorType:"SelectItem",valueMap:["","Backgrounds","Fonts","Borders"]},
            {name:"backgroundCount",title:"Background"},
            {name:"colorCount",title:"Text"},
            {name:"borderCount",title:"Border"},
            {name:"borderTopCount",title:"Top"},
            {name:"borderLeftCount",title:"Left"},
            {name:"borderBottomCount",title:"Bottom"},
            {name:"borderRightCount",title:"Right"},
            {name:"background",hidden:true},
            {name:"color",hidden:true},
            {name:"border",hidden:true},
            {name:"borderTop",hidden:true},
            {name:"borderLeft",hidden:true},
            {name:"borderBottom",hidden:true},
            {name:"borderRight",hidden:true},
            {name:"red",type:"integer",hidden:true},
            {name:"green",type:"integer",hidden:true},
            {name:"blue",type:"integer",hidden:true},
            {"name":"lab",hidden:true}
        ],
        headerSpans:[
            {
                fields:["original","isSkinCSS","mostlyType","backgroundCount","colorCount"],
                title:"Color"
            },
            {
                fields:["borderCount","borderTopCount","borderLeftCount","borderBottomCount","borderRightCount"],
                title:"Borders"
            }
        ],
        recordClick:function(viewer,record,recordNum,field,fieldNum,value,rawValue){
            viewer.creator.converter.setColor(record.original);
        },
        showFilterEditor:true,
        canGroupby:true,
        canMultiGroup:true,
        allowFilterExpressions:true,
        dataArrived:function(){
            this.creator.rowCountLabel.setContents(this.data.getLength()+" filtered rows...");
        },
        initialCriteria:{_constructor:"AdvancedCriteria",operator:"and",
            criteria:[
                {fieldName:"isSkinCSS",operator:"equals",value:true}
            ]
        },
        initialSort:[{property:"lab",direction:"ascending"}]
    };
isc.A.buttonBarDefaults={
        _constructor:"HLayout",
        overflow:"visible",
        membersMargin:5,
        height:40
    };
isc.A.loadConfigButtonDefaults={
        _constructor:"IButton",
        title:"Load Config",
        autoFit:true,
        click:function(){
            this.creator.loadConfig();
        }
    };
isc.A.saveConfigButtonDefaults={
        _constructor:"IButton",
        title:"Save Config",
        autoFit:true,
        click:function(){
            this.creator.saveConfig();
        }
    };
isc.A.allButtonDefaults={
        _constructor:"IButton",
        title:"All",
        autoFit:true,
        click:function(){
            this.creator.grid.setCriteria({});
        }
    };
isc.A.only1RefButtonDefaults={
        _constructor:"IButton",
        title:"Only 1 ref",
        autoFit:true,
        click:function(){
            this.creator.grid.setCriteria(this.creator.getSearchCrit("lessThan",2));
        }
    };
isc.A.lessThan5RefsButtonDefaults={
        _constructor:"IButton",
        title:"Less than 5 refs",
        autoFit:true,
        click:function(){
            this.creator.grid.setCriteria(this.creator.getSearchCrit("lessThan",5));
        }
    };
isc.A.rowCountLabelDefaults={
        _constructor:"Label",
        autoFit:true,
        wrap:false,
        color:"white"
    };
isc.A.rightPaneDefaults={
        _constructor:"VLayout",
        membersMargin:5,
        height:"100%"
    };
isc.A.paletteDefaults={
        _constructor:"SkinColorPalette",
        title:"Palette Colors"
    };
isc.A.closestPaletteDefaults={
        _constructor:"SkinColorPalette",
        title:"Closest Colors"
    };
isc.A.converterDefaults={
        _constructor:"ColorConverter",
        setColor:function(color){
            this.Super("setColor",arguments);
            this.creator.converterColorChanged(this.inputColor);
        }
    };
isc.A.repo=null;
isc.B.push(isc.A.initWidget=function isc_SkinPaletteTools_initWidget(){
        this.Super("initWidget",arguments);
        this.colorArrays=isc.SkinUtil.colorArrays;
        this.config={colors:[],fonts:[]};
        this.createDataSources();
        this.addAutoChild("leftPane");
        this.addMember(this.leftPane);
        this.addAutoChild("grid");
        this.leftPane.addMember(this.grid);
        this.addAutoChild("buttonBar");
        this.leftPane.addMember(this.buttonBar,0);
        this.addAutoChildren(["loadConfigButton","saveConfigButton","allButton","only1RefButton","lessThan5RefsButton","rowCountLabel"]);
        this.buttonBar.addMembers([this.loadConfigButton,this.saveConfigButton,this.allButton,this.only1RefButton,this.lessThan5RefsButton,this.rowCountLabel])
        this.addAutoChild("rightPane")
        this.addMember(this.rightPane);
        this.addAutoChild("converter");
        this.rightPane.addMember(this.converter);
        this.addAutoChild("palette",{title:"Palette Colors"});
        this.rightPane.addMember(this.palette);
        this.addAutoChild("closestPalette",{title:"Closest Colors",colors:[]});
        this.rightPane.addMember(this.closestPalette);
    }
,isc.A.converterColorChanged=function isc_SkinPaletteTools_converterColorChanged(inputColor){
        this.palette.selectColor(inputColor);
        this.closestPalette.drawColors(isc.SkinUtil.getClosestColors(inputColor,50));
    }
,isc.A.getSearchCrit=function isc_SkinPaletteTools_getSearchCrit(operator,value){
        var crit={_constructor:"AdvancedCriteria",operator:"and",criteria:[]};
        for(var i=0;i<this.colorArrays.length;i++){
            crit.criteria.add({fieldName:this.colorArrays[i]+"Count",operator:operator,value:value});
        }
        return crit
    }
,isc.A.createDataSources=function isc_SkinPaletteTools_createDataSources(){
        isc.SkinUtil.createDataSources();
        this.colorSearchDS=isc.SkinUtil.colorSearchDS;
    }
,isc.A.getRepo=function isc_SkinPaletteTools_getRepo(){
        if(!this.repo)this.repo=isc.ViewRepo.create();
        return this.repo;
    }
,isc.A.loadConfig=function isc_SkinPaletteTools_loadConfig(callback,force){
        var _callback=callback;
        if(!force&&this.configChanged){
            isc.ask("Config has been changed - proceed anyway (changes will be lost)?",
                function(value){
                    if(value!=null&&value==true){
                        this.loadConfig(_callback,true);
                    }
                }
            );
            return;
        }
        var _this=this;
        this.loadFile("/isomorphic/skins/_internalSource/tools/skinColors/skin.config",
            function(data){
                _this.configLoaded(data,_callback);
            }
        );
    }
,isc.A.configLoaded=function isc_SkinPaletteTools_configLoaded(data,callback){
        this.config=isc.JSON.decode(data);
        isc.logWarn(isc.echoFull(data));
        var colorCount=this.config.colors.length,
            colorMap={};
        if(colorCount>0){
            for(var i=0;i<colorCount;i++){
                var entry=this.config.colors[i];
                colorMap[entry.original]=entry.current;
            }
            isc.Canvas.changeSkinColors(colorMap);
        }
        if(callback)this.fireCallback(callback,"data",[data]);
    }
,isc.A.loadFile=function isc_SkinPaletteTools_loadFile(path,callback){
        var repo=this.getRepo();
        var _callback=callback;
        repo.loadObject({criteria:{path:path}},
            function(data,context,callback){
                _callback(data);
            }
        );
    }
,isc.A.saveFile=function isc_SkinPaletteTools_saveFile(contents,path,callback){
        var repo=this.getRepo();
        var _callback=callback;
        var _this=this;
        var ds=isc.DS.get("Filesystem");
        var record={
            path:path,
            name:path,
            fileName:path,
            contents:isc.JSON.encode(contents)
        };
        ds.updateData(record,
            function(dsResponse){
                _this.saveObjectReply(dsResponse,_callback,record);
            }
        );
    }
,isc.A.saveObjectReply=function isc_SkinPaletteTools_saveObjectReply(dsResponse,callback,context){
        this.configChanged=false;
        if(callback)this.fireCallback(callback,"success",[true]);
    }
,isc.A.saveConfig=function isc_SkinPaletteTools_saveConfig(config,callback){
        config=config||this.config
        this.saveFile(config,"/isomorphic/skins/_internalSource/tools/skinColors/skin.config",
            function(success){
                isc.logWarn(success);
            }
        );
    }
,isc.A.changeConfigColor=function isc_SkinPaletteTools_changeConfigColor(oldColor,newColor,types){
        var entry=this.config.colors.find("original",oldColor);
        if(entry){
            entry.current=newColor;
        }else{
            if(!types)types={background:true,border:true,color:true}
            entry={original:oldColor,current:newColor,types:types};
            this.config.colors.add(entry);
        }
        this.configChanged=true;
    }
);
isc.B._maxIndex=isc.C+12;

isc.showPaletteTools=isc.SkinUtil.showSkinPaletteTools;
isc.defineClass("SkinMetadata","Class");
isc.A=isc.SkinMetadata;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.initialize=function isc_c_SkinMetadata_initialize(callback){
        this.toolsDir=isc.Page.getToolsDir();
        this.skinToolsDir=this.toolsDir+"skinTools/";
        this.metadataPath=this.skinToolsDir+"data/";
        this.dsObserver=isc.Class.create({
            owner:this,
            variableMetadataChanged:function(){
                this.owner._notifyDirty(true,"variable");
            },
            groupMetadataChanged:function(){
                this.owner._notifyDirty(true,"group");
            }
        });
        this.groupMetadataDS=this.getNewGroupMetadataDS("groupMetadataDS");
        this.dsObserver.observe(this.groupMetadataDS,"dataChanged","observer.groupMetadataChanged(true);");
        this.variableMetadataDS=this.getNewVariableMetadataDS("variableMetadataDS");
        this.dsObserver.observe(this.variableMetadataDS,"dataChanged","observer.variableMetadataChanged(true);");
        var _this=this;
        this.groupMetadataDS.fetchData(null,function(){
            _this.groupMetadataDS.cacheData.map(function(row){
                if(row.iscClass!=null){
                    var imageRecord=isc.Class.getClassIcon(row.iscClass);
                    if(imageRecord){
                        row.icon=imageRecord.src;
                    }
                }
            });
            _this.variableMetadataDS.fetchData(null,function(){
                _this.variableMetadataDS.cacheData.map(function(row){
                    if(row.iscClass!=null){
                        var imageRecord=isc.Class.getClassIcon(row.iscClass);
                        if(imageRecord){
                            row.icon=imageRecord.src;
                        }
                    }
                });
                _this._initialized=true;
                if(callback)callback();
            });
        });
    }
,isc.A._notifyDirty=function isc_c_SkinMetadata__notifyDirty(dirty,type){
        if(type=="group")this.getGroupMetadataDS()._isDirty=dirty;
        else if(type=="variable")this.getGroupMetadataDS()._isDirty=dirty;
        this._isDirty=this.dataDirty();
        if(this.notifyDirty)this.notifyDirty(dirty,type);
    }
,isc.A.dataDirty=function isc_c_SkinMetadata_dataDirty(){
        return this.getGroupMetadataDS()._isDirty||this.getVariableMetadataDS()._isDirty;
    }
,isc.A.getNewGroupMetadataDS=function isc_c_SkinMetadata_getNewGroupMetadataDS(ID){
        var fields=isc.DS.get("skinVariableGroups").getFields();
        var newFields=[];
        for(var fieldName in fields){
            var field=fields[fieldName];
            var newField=isc.addProperties({},field);
            delete newField.columnCode;
            delete newField._typeDefaultsAdded;
            delete newField.validators;
            delete newField._simpleType;
            var fKey=newField.foreignKey;
            if(fKey){
                newField.foreignKey=fKey.replace("skinVariableGroups",ID);
            }
            newFields.add(newField);
        }
        return isc.DataSource.create({
            ID:ID,
            fields:newFields,
            clientOnly:true,
            dataURL:this.metadataPath+"groupMetadata.json"
        });
    }
,isc.A.getGroupMetadataDS=function isc_c_SkinMetadata_getGroupMetadataDS(){
        if(!this._initialized){
            this.logWarn("Initializing metadata - call isc.SkinMetadata.initialize()");
            this.initialize();
        }
        return this.groupMetadataDS;
    }
,isc.A.saveGroupMetaData=function isc_c_SkinMetadata_saveGroupMetaData(ds,callback){
        ds=ds||this.getGroupMetadataDS();
        var records=ds.cacheData;
        var data=[];
        for(var i=0;i<records.length;i++){
            var record=isc.addProperties({},records[i]);
            for(var key in record){
                if(["isFolder","children"].contains(key))delete record[key];
                if(key.startsWith("_"))delete record[key];
                delete record.icon;
            }
            data.add(record);
        }
        data.setSort([
            {property:"parentId",direction:"ascending"},
            {property:"index",direction:"ascending"}
        ]);
        var _this=this;
        isc.DS.get("userSkin").performCustomOperation("updateVariableGroupMetadata",
            {metadata:data},
            function(response){
                _this.logWarn("Output-Group metadata updated...");
                _this._notifyDirty(false,"group");
                if(callback)callback(response);
            },{useStrictJSON:true}
        );
    }
,isc.A.getNewVariableMetadataDS=function isc_c_SkinMetadata_getNewVariableMetadataDS(ID,addEditFields){
        var fields=isc.DS.get("skinVariables").getFields();
        var newFields=[];
        for(var fieldName in fields){
            var field=fields[fieldName];
            var newField=isc.addProperties({},field);
            delete newField.columnCode;
            delete newField._typeDefaultsAdded;
            delete newField.validators;
            delete newField._simpleType;
            var fKey=newField.foreignKey;
            if(fKey){
                newField.foreignKey=fKey.replace("skinVariables",ID);
            }
            newFields.add(newField);
        }
        if(addEditFields){
            newFields.add({name:"transformedValue"});
            newFields.add({name:"transformResult"});
            newFields.add({name:"metadataValue"});
            newFields.add({name:"themeValue"});
            newFields.add({name:"customValue"});
            newFields.add({name:"savedValue"});
        }
        var ds=isc.DataSource.create({
            ID:ID,
            fields:newFields,
            clientOnly:true,
            dataURL:this.metadataPath+"variableMetadata.json"
        });
        return ds;
    }
,isc.A.getVariableMetadataDS=function isc_c_SkinMetadata_getVariableMetadataDS(){
        if(!this._initialized)this.initialize();
        return this.variableMetadataDS;
    }
,isc.A.saveVariableMetadata=function isc_c_SkinMetadata_saveVariableMetadata(ds,callback){
        ds=ds||this.getVariableMetadataDS()
        var records=ds.cacheData;
        var data=[];
        for(var i=0;i<records.length;i++){
            var record=isc.addProperties({},records[i]);
            for(var key in record){
                if(key.startsWith("_"))delete record[key];
            }
            delete record.transform;
            delete record.icon;
            data.add(record);
        }
        data.setSort([{property:"id",direction:"ascending"}]);
        var _this=this;
        isc.DS.get("userSkin").performCustomOperation("updateVariableMetadata",
            {metadata:data},
            function(response){
                _this.logWarn("Variable metadata updated...");
                _this._notifyDirty(false,"variable");
                if(callback)callback(response);
            },{useStrictJSON:true}
        );
    }
,isc.A.isColorTransform=function isc_c_SkinMetadata_isColorTransform(value){
        return value.startsWith("lighten")||value.startsWith("darken")
            ||value.startsWith("saturate")||value.startsWith("desaturate")
            value.startsWith("brighten")||value.startsWith("dim");
    }
,isc.A.regenSeriesDynamicBaseFile=function isc_c_SkinMetadata_regenSeriesDynamicBaseFile(seriesName,callback){
        seriesName=seriesName||"Flat";
        var SF=isc.SkinFunc;
        var SM=isc.SkinMetadata;
        var _this=this;
        isc.DS.get("skinSeries").fetchData({name:seriesName},function(response,data){
            var series=isc.isAn.Array(data)?data[0]:data;
            var content=series.baseCSS;
            var section=SF.readSection("skin_base_styles",content);
            var vars=SM.getVariableMetadataDS().cacheData;
            vars.setSort({property:"name",direction:"descending"});
            for(var i=0;i<vars.length;i++){
                var v=vars[i],
                    vName=v.name
                ;
                if(v.value.contains("linear")){
                    continue;
                }
                if(vName.contains("transition")||vName.contains("fadeIn")||
                    vName.contains("fadeOut")||vName.contains("duration")||
                    vName.contains("fudgeFact")){
                    continue;
                }
                section=section.replaceAll(vName+" ","var(--isc-"+vName.substring(1)+") ")
                section=section.replaceAll(vName+")","var(--isc-"+vName.substring(1)+"))")
                section=section.replaceAll(vName+";","var(--isc-"+vName.substring(1)+");")
                section=section.replaceAll(vName+":","var(--isc-"+vName.substring(1)+"):")
                section=section.replaceAll(vName+"+","var(--isc-"+vName.substring(1)+")+")
                section=section.replaceAll(vName+"-","var(--isc-"+vName.substring(1)+")-")
                section=section.replaceAll(vName+",","var(--isc-"+vName.substring(1)+"),")
            }
            var newContent=SF.replaceSectionContent("skin_base_styles",section,content);
            isc.DS.get("skinSeries").updateData({name:seriesName,dynamicCSS:newContent},
                function(response,data){
                    isc.logWarn("Dynamic Base File _base"+seriesName+"_cssProps.scss regenerated...");
                    if(callback)callback();
                }
            );
        });
    }
,isc.A.parseSettings=function isc_c_SkinMetadata_parseSettings(content,valueField){
        var list=[],
            attrStart=-1,
            attrEnd,
            lineEnd=-1,
            index=0
        ;
        var c=content;
        var cssOffset=c.indexOf("//* CSS *//");
        if(cssOffset>0){
            c=c.substring(0,cssOffset-1);
        }
        while(true){
            attrStart=c.indexOf("$",lineEnd+1);
            if(attrStart==-1){
                break;
            }
            attrEnd=c.indexOf(":",attrStart);
            lineEnd=c.indexOf(";",attrEnd+1)
            var item={
                name:c.substring(attrStart,attrEnd),
                value:c.substring(attrEnd+1,lineEnd).trim(),
                index:index++
            };
            item[valueField]=item.value;
            list.add(item);
        }
        return list;
    }
,isc.A.regenAllBaseSkinFiles=function isc_c_SkinMetadata_regenAllBaseSkinFiles(callback){
        var _this=this;
        _this._skinRegen=[];
        isc.DS.get("baseSkin").fetchData({},function(response,data){
            for(var i=0;i<data.length;i++){
                _this._skinRegen.add({name:data[i].name,regen:1});
                isc.SkinMetadata.regenBaseSkinFiles(data[i].name,callback);
            }
        });
    }
,isc.A.regenBaseSkinFiles=function isc_c_SkinMetadata_regenBaseSkinFiles(theme,callback){
        var SM=isc.SkinMetadata;
        var SF=isc.SkinFunc;
        var ds=SM.getNewVariableMetadataDS(null);
        var _this=this;
        ds.fetchData({},function(response,data){
            var dsData=ds.cacheData;
            isc.DS.get("fileSystemSkin").fetchData({name:theme},function(dsResponse,data){
                if(isc.isAn.Array(data))data=data[0];
                var skinSettings=data.skinSettings;
                var content=SF.readSection("theme_variables",skinSettings);
                var finalSettings=SM.parseSettings(content||"","value");
                SM.applyOverlaySettings(ds,finalSettings);
                var themeSettings=SF.getVariableScript(dsData,
                        {includeAll:true},
                        SM.getGroupMetadataDS().cacheData
                );
                skinSettings=SF.replaceSectionContent("theme_variables",themeSettings,skinSettings);
                var cssProps="\n@function v($var) {@return var(--#{$var});}\n:root {";
                cssProps+=SM.generateThemeCssProperties(themeSettings,dsData);
                cssProps+=";\n}";
                isc.DS.get("fileSystemSkin").updateData({name:theme,skinSettings:skinSettings,cssProperties:cssProps},
                    function(){
                        _this._skinRegen.find("name",theme).regen=0;
                        isc.logWarn(theme+" updated - _Theme"+theme+".scss and _cssProperties.scss regenerated...");
                        if(_this._skinRegen.getProperty("regen").sum()==0){
                            if(callback)callback();
                        }
                    }
                );
            });
        });
    }
,isc.A.applyOverlaySettings=function isc_c_SkinMetadata_applyOverlaySettings(ds,settings){
        var baseData=ds.cacheData;
        for(var i=0;i<baseData.length;i++){
            var record=baseData[i];
            var lEntry=settings.find("name",record.name);
            if(lEntry!=null)record.value=lEntry.value;
        }
    }
,isc.A.generateThemeCssProperties=function isc_c_SkinMetadata_generateThemeCssProperties(script,data){
        var settings=script.split("\n");
        var output=[];
        var endChars=[";",",",")"," ","+","-"];
        var SM=isc.SkinMetadata;
        for(var i=0;i<settings.length;i++){
            var setting=settings[i];
            if(!setting||setting=="")continue;
            if(setting.startsWith("//"))continue;
            var bits=setting.split(":");
            var name=bits[0].substring(1);
            if(bits[1]==null)continue;
            var value=bits[1].trim().replaceAll(";","");
            var d=data.find("name","$"+name);
            if(value.contains("linear"))continue;
            var entry=null;
            if(name.contains("transition")||name.contains("fadeIn")||
                name.contains("fadeOut")||name.contains("duration")||
                name.contains("fudgeFact")){
                continue;
            }
            if(value.startsWith("$")&&!value.contains(" ")){
                value="#{v(isc-"+value.substring(1)+")}";
                entry="--isc-"+name+": "+value;
            }else if(value.contains("$")){
                if(SM.isColorTransform(value)||value.startsWith("adjust")){
                    entry="--isc-"+name+": #{$"+name+"}";
                }else{
                    for(var j=0;j<data.length;j++){
                        var ind=value.indexOf(data[j].name);
                        if(ind>=0){
                            ind+=data[j].name.length;
                            var nextChar=value.substring(ind,ind+1);
                            if(ind>=value.length||endChars.contains(nextChar)){
                                value=value.replaceAll(data[j].name,"#{v(isc-"+data[j].name.substring(1)+")}");
                                if(!value.contains("$"))break;
                            }
                        }
                    }
                    entry="--isc-"+name+": "+value;
                }
            }else{
                entry="--isc-"+name+": #{$"+name+"}";
            }
            output.add(entry);
        }
        var result=output.join(";\n");
        return result;
    }
,isc.A.getClassIconValueMap=function isc_c_SkinMetadata_getClassIconValueMap(){
        if(isc.SkinMetadata._classIconValueMap)return isc.SkinMetadata._classIconValueMap;
        var ds=isc.ImagePicker.getStockIconDS("classIcons");
        var records=ds.cacheData.duplicate();
        var result=records.getProperty("name").getUniqueItems().sort();
        isc.SkinMetadata._classIconValueMap=result;
        return isc.SkinMetadata._classIconValueMap;
    }
,isc.A.getClassIconValueIcons=function isc_c_SkinMetadata_getClassIconValueIcons(){
        if(isc.SkinMetadata._classIconValueIcons)return isc.SkinMetadata._classIconValueIcons;
        var ds=isc.ImagePicker.getStockIconDS("classIcons");
        var records=ds.cacheData.duplicate();
        var result=records.getValueMap("name","src");
        isc.SkinMetadata._classIconValueIcons=result;
        return isc.SkinMetadata._classIconValueIcons;
    }
);
isc.B._maxIndex=isc.C+18;

if(!isc.SkinFunc)isc.defineClass("SkinFunc");
isc.A=isc.SkinFunc;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.metadataPath=isc.Page.getToolsDir()+"skinTools/data/";
isc.A.repo=null;
isc.A.seriesSassPath="/isomorphic/skins/_internalSource/FlatSeries/sass/";
isc.A.skinsFolderPath="/isomorphic/skins/";
isc.A.currentSeries=null;
isc.A.shouldImportSkinVars=false;
isc.A.transformTypes={
        "none":"None",
        "lighten":"Lighten",
        "darken":"Darken",
        "saturate":"Saturate",
        "desaturate":"Desaturate",
        "custom":"Custom"
    };
isc.B.push(isc.A.loadFile=function isc_c_SkinFunc_loadFile(path,callback){
        if(!path){
            isc.say("loadFile called with no file-path");
            return null;
        }
        var _callback=callback;
        if(!isc.SkinFunc.repo){
            isc.SkinFunc.repo=isc.ViewRepo.create({
                dataSource:isc.DS.get("Filesystem")
            });
        }
        isc.SkinFunc.repo.loadObject({criteria:{path:path}},
            function(data,context,callback){
                _callback(data);
            }
        );
        return;
    }
,isc.A.saveFile=function isc_c_SkinFunc_saveFile(contents,path,callback){
        if(!path){
            isc.say("saveFile called with no file-path");
            return null;
        }
        var _callback=callback;
        var content=(isc.isA.String(contents)?contents:
                isc.JSON.encode(contents,{prettyPrint:false}));
        var ds=isc.DS.get("Filesystem");
        var record={
            path:path,
            name:path,
            fileName:path,
            contents:content
        };
        ds.updateData(record,
            function(dsResponse){
                if(_callback)_callback(record);
            }
        );
    }
,isc.A.init=function isc_c_SkinFunc_init(){
        var SF=isc.SkinFunc;
        if(!SF._initialized){
            SF.createDataSources();
            SF._initialized=true;
        }
    }
,isc.A.createDataSources=function isc_c_SkinFunc_createDataSources(){
        var SF=isc.SkinFunc;
        isc.RPCManager.startQueue();
        SF.groupMetadataDS=isc.DataSource.create({
            ID:"groupMetadataDS",
            inheritsFrom:"skinVariableGroups",
            clientOnly:true,
            dataURL:SF.metadataPath+"groupMetadata.json"
        }).fetchData();
        SF.skinVariableDS=isc.DataSource.create({
            ID:"variableMetadataDS",
            inheritsFrom:"skinVariables",
            clientOnly:true,
            dataURL:SF.metadataPath+"variableMetadata.json"
        }).fetchData();
        isc.RPCManager.sendQueue();
    }
,isc.A.getVariableGroupCache=function isc_c_SkinFunc_getVariableGroupCache(){
        return isc.SkinFunc.groupMetadataDS.cacheData;
    }
,isc.A.getVariablesDS=function isc_c_SkinFunc_getVariablesDS(dsName,data){
        var ds=isc.DataSource.create({
            ID:dsName,
            clientOnly:true,
            inheritsFrom:"skinVariables"
        });
        if(data){
            ds.cacheData=data;
        }
        return ds;
    }
,isc.A.editVariableName=function isc_c_SkinFunc_editVariableName(attr,series,dbc){
        series=series||isc.SkinFunc.currentSeries;
        var attrName=(isc.isAn.Object(attr)?attr.name:attr);
        if(attrName.startsWith("$"))attrName=attrName.substring(1);
        isc.askForValue("Rename '"+attrName+"' to:",function(value){
            if(!value){
                isc.say("No value entered");
                return;
            }
            value=value.trim();
            if(!value.startsWith("$"))value="$"+value;
            isc.SkinFunc.changeVariableName(series,attr,value);
            if(dbc)dbc.invalidateCache();
        },{defaultValue:attrName,width:400});
    }
,isc.A.changeVariableName=function isc_c_SkinFunc_changeVariableName(series,fromName,toName){
        series.changeVariableName(fromName,toName);
    }
,isc.A.getThemeOutputPath=function isc_c_SkinFunc_getThemeOutputPath(themeName,local){
        if(local)return"/tools/skinTools/_internalSource/";
        return isc.SkinFunc.skinsFolderPath+themeName+"/_internalSource/sass/";
    }
,isc.A.getOutputPath=function isc_c_SkinFunc_getOutputPath(local){
        if(local)return"/tools/skinTools/_internalSource/";
        return isc.SkinFunc.seriesSassPath;
    }
,isc.A.loadSeries=function isc_c_SkinFunc_loadSeries(seriesName,themeNames,callback){
        var series=isc.SkinSeries.create({
            ID:"series_"+seriesName,
            seriesName:seriesName,
            themeNames:themeNames,
            _loadCallback:callback
        });
        series.loadSeries(seriesName,themeNames);
    }
,isc.A.readSection=function isc_c_SkinFunc_readSection(keyName,data){
        if(!data)return"";
        var startTag="//>"+keyName,
            start=data.indexOf(startTag)+startTag.length,
            end=data.indexOf("//<"+keyName)
        ;
        return data.substring(start,end);
    }
,isc.A.replaceSectionContent=function isc_c_SkinFunc_replaceSectionContent(keyName,newContent,base){
        var startTag="//>"+keyName;
        var startIndex=base.indexOf(startTag);
        if(startIndex<0)return false;
        startIndex+=startTag.length;
        var endIndex=base.indexOf("//<"+keyName);
        if(endIndex<0)return false;
        var content=base.substring(0,startIndex);
        content+=newContent;
        content+="\n"+base.substring(endIndex);
        return content;
    }
,isc.A.getSectionContent=function isc_c_SkinFunc_getSectionContent(keyName,data){
        data=data||"";
        var result="//>"+keyName+"\n"+data.trim()+"\n//<"+keyName+"\n";
        isc.logWarn("writing section "+keyName+"\n\n"+result);
        return result;
    }
,isc.A.remapOutputIndices=function isc_c_SkinFunc_remapOutputIndices(groupData,variableDS){
        if(!variableDS){
            isc.logWarn("No variableDS provided to remapOutputIndices().")
            return;
        }
        var groups=groupData||isc.SkinFunc.getVariableGroupCache();
        var topLevel=[];
        for(var i=0;i<groups.length;i++){
            if(groups[i].parentId==null||groups[i].parentId=="none")topLevel.add(groups[i]);
        }
        topLevel.setSort([{property:"index",direction:"ascending"}]);
        variableDS.fetchData({},function(response,data){
            for(var i=0;i<topLevel.length;i++){
                var topGroup=topLevel[i];
                var kids=groups.findAll("parentId",topGroup.name)||[];
                kids.setSort([{property:"index",direction:"ascending"}]);
                if(kids.length>0){
                    for(var j=0;j<kids.length;j++){
                        var vars=data.findAll({outputGroup:kids[j].name})||[];
                        vars.setSort([{property:"outputIndex",direction:"ascending"}]);
                        for(var i=0;i<vars.getLength();i++){
                            var attr=vars.get(i);
                            attr.outputIndex=i*10;
                            variableDS.updateData(attr);
                        }
                    }
                }
            }
        });
    }
,isc.A.getOutputGroup=function isc_c_SkinFunc_getOutputGroup(group,groupList,variableList){
        var result={group:group};
        result.childGroups=groupList.findAll("parentId",group.name)||[];
        result.childGroups.setSort([{property:"index",direction:"ascending"}]);
        result.variables=variableList.findAll({outputGroup:group.name})||[];
        result.variables.setSort([{property:"outputIndex",direction:"ascending"}]);
        return result;
    }
,isc.A.getGroupScript=function isc_c_SkinFunc_getGroupScript(group,groupList,variableList,props){
        var groupData=this.getOutputGroup(group,groupList,variableList),
            thisGroup=groupData.group,
            isTopLevel=thisGroup.parentId==null||thisGroup.parentId=="none",
            results=[]
        ;
        if(isTopLevel){
            var output="\n// ==== "+thisGroup.title;
            if(thisGroup.comment&&thisGroup.comment!=""){
                var comments=thisGroup.comment.split("\n");
                if(comments.length==1){
                    results.add(output+" - "+comments[0]);
                }else{
                    results.add(output);
                    for(var jj=0;jj<comments.length;jj++){
                        results.add("// "+comments[jj]);
                    }
                }
            }
        }else{
            if(thisGroup.comment&&thisGroup.comment!=""){
                var comments=thisGroup.comment.split("\n");
                for(var jj=0;jj<comments.length;jj++){
                    results.add("// "+comments[jj]);
                }
            }else if(thisGroup.title&&thisGroup.title!=""){
                results.add("// "+thisGroup.title);
            }
        }
        if(groupData.variables.length>0){
            for(var k=0;k<groupData.variables.getLength();k++){
                var attr=groupData.variables.get(k);
                if(!props.includeAll&&attr.exclude)continue;
                var value=null;
                if(props.exportFieldName){
                    if(attr[props.exportFieldName])value=attr[props.exportFieldName];
                }
                if(value==null)value=(props.returnDefaults?attr.defaultValue:attr.value);
                if(value==null)value=attr.value;
                value=value.replaceAll("!default").trim();
                if(value.endsWith(";"))value=value.substring(0,value.length-1).trim();
                var result=attr.name+": "+value;
                if(props.returnDefaults)result+=" !default";
                if(!result.endsWith(";"))result+=";";
                results.add(result);
            }
        }
        if(groupData.childGroups.length>0){
            for(var j=0;j<groupData.childGroups.length;j++){
                results.addList(this.getGroupScript(groupData.childGroups[j],groupList,variableList,props));
            }
        }
        return results;
    }
,isc.A.getVariableScript=function isc_c_SkinFunc_getVariableScript(passedData,props,groupMetadata){
        props=props||{};
        var variableList=(isc.isA.ResultSet(passedData)?passedData.allRows:passedData),
            groupList=groupMetadata||isc.SkinMetadata.getGroupMetadataDS().cacheData,
            topLevel=[],
            results=[]
        ;
        topLevel.addList(groupList.findAll("parentId",null));
        topLevel.addList(groupList.findAll("parentId","none"))
        topLevel.setSort([{property:"index",direction:"ascending"}]);
        for(var i=0;i<topLevel.length;i++){
            var groupResults=this.getGroupScript(topLevel[i],groupList,variableList,props);
            results.addList(groupResults);
        }
        var results=results.join("\n");
        return results;
    }
,isc.A.getExcludedRecords=function isc_c_SkinFunc_getExcludedRecords(data){
        data=data||isc.SkinFunc.currentSeries.variablesRS.allRows;
        var result=",",
            excludedCount=0
        ;
        for(var i=0;i<data.length;i++){
            if(data[i].exclude){
                excludedCount++;
                result+=","+data[i].name;
            }
        }
        result=result.replaceAll(",,","");
        isc.logWarn("Returning "+excludedCount+" excluded skin-attributes:\n\n"+isc.echoFull(result));
    }
,isc.A.importSkinVars=function isc_c_SkinFunc_importSkinVars(theme){
        var list=[],
            attrStart=-1,
            attrEnd,
            lineEnd=-1,
            lastVar,
            lastValue
        ;
        var SF=isc.SkinFunc,
            counter=0
        ;
        var vars=theme.themeVariableData;
        while(2>1){
            attrStart=vars.indexOf("$",lineEnd+1);
            if(attrStart==-1){
                break;
            }
            attrEnd=vars.indexOf(":",attrStart);
            lineEnd=vars.indexOf(";",attrEnd+1)
            var newAttr={id:counter++,
                name:lastVar,
                value:lastValue,
                usedBy:[],
                name:vars.substring(attrStart,attrEnd),
                defaultValue:vars.substring(attrEnd+1,lineEnd).replaceAll("\n").trim()
            };
            if(newAttr.defaultValue.contains("!important")){
                newAttr.defaultValue=newAttr.replaceAll("!important");
            }
            newAttr.defaultValue=newAttr.defaultValue.trim();
            newAttr.value=newAttr.defaultValue;
            newAttr.keywords=newAttr.name.substring(1).split("_");
            list.add(newAttr);
        }
        var series=SF.currentSeries,
            base=series.baseFile.content,
            themeData=series.themes[0].themeVariableData
        ;
        for(var i=0;i<list.length;i++){
            var attr=list[i];
            for(var j=0;j<list.length;j++){
                if(list[j].value==attr.name){
                    list[j].derivesFrom+=attr.name;
                }else if(list[j].value.contains(attr.name)){
                    attr.usedBy.add(list[j].name);
                }
            }
            if(base.contains(attr.name+";")||
                base.contains(attr.name+",")||
                base.contains(attr.name+" ")||
                base.contains(attr.name+")")
            ){
                attr.usedInSeriesFile=true;
            }else attr.usedInSeriesFile=false;
            if(themeData.contains(attr.name+";")||
                themeData.contains(attr.name+",")||
                themeData.contains(attr.name+" ")||
                themeData.contains(attr.name+")")
            ){
                attr.usedInThemeFile=true;
            }else attr.usedInThemeFile=false;
            if(!attr.usedInSeriesFile&&!attr.usedInThemeFile){
                attr.exclude=(attr.name.endsWith("_hue")||
                    attr.name.endsWith("_saturation")||
                    attr.name.endsWith("_lightness"));
            }else{
                attr.exclude=false;
            }
            if(attr.category)continue;
            if(attr.name.endsWith("_bgColor")){
                attr.category="color";
                attr.valueType="color";
                attr.valueSubType="background";
            }else if(attr.name.endsWith("_border_color")){
                attr.category="color";
                attr.valueType="color";
                attr.valueSubType="border";
            }else if(attr.name.endsWith("_color")){
                attr.category="color";
                attr.valueType="color";
                attr.valueSubType="text";
            }else if(attr.name.endsWith("_hue")){
                attr.category="color";
                attr.valueType="color";
                attr.valueSubType="hue";
            }else if(attr.name.endsWith("_saturation")){
                attr.category="color";
                attr.valueType="color";
                attr.valueSubType="saturation";
            }else if(attr.name.endsWith("_lightness")){
                attr.category="color";
                attr.valueType="color";
                attr.valueSubType="lightness";
            }else if(attr.name.contains("font_size")){
                attr.category="font";
                attr.valueType="font";
                attr.valueSubType="size";
            }else if(attr.name.contains("font")){
                attr.category="font";
                attr.valueType="font";
                attr.valueSubType="font";
            }
        }
        return list;
    }
,isc.A.transformColor=function isc_c_SkinFunc_transformColor(color,transform,delta){
        color=isc.tinycolor(color);
        if(transform=="custom"){
        }else if(transform!="none"){
            if(color[transform])color[transform](delta);
        }
        return color.toHexString();
    }
,isc.A.updateVariableMetaData=function isc_c_SkinFunc_updateVariableMetaData(series,transforms){
        var ds=isc.DS.get("skinVariables"),
            data=series.variablesRS.allRows,
            base=series.baseFile.content
        ;
        var excludeCountPos=0,
            excludeCountNeg=0
        ;
        transforms=transforms||{};
        if(transforms.updateUsageAndExclude==null)transforms.updateUsageAndExclude=false;
        if(transforms.removeUsedBy==null)transforms.removeUsedBy=true;
        for(var i=0;i<data.length;i++){
            var record=isc.addProperties({},data[i]);
            if(transforms.updateUsageAndExclude){
                var wasUsedInSeriesFile=record.usedInSeriesFile,
                    wasUsedInThemeFile=record.usedInThemeFile
                ;
                if(base.contains(record.name+";")||
                    base.contains(record.name+",")||
                    base.contains(record.name+" ")||
                    base.contains(record.name+")")
                ){
                    record.usedInSeriesFile=true;
                }else record.usedInSeriesFile=false;
                var found=false;
                for(var k=0;k<series.themes.length;k++){
                    var themeVars=series.themes[k].themeVariableData;
                    if(themeVars.contains(record.name+";")||
                        themeVars.contains(record.name+",")||
                        themeVars.contains(record.name+" ")||
                        themeVars.contains(record.name+")")
                    ){
                        found=true;
                        break;
                    }
                    var themeCustom=series.themes[k].customFileContent;
                    if(themeCustom.contains(record.name+";")||
                        themeCustom.contains(record.name+",")||
                        themeCustom.contains(record.name+" ")||
                        themeCustom.contains(record.name+")")
                    ){
                        found=true;
                        break;
                    }
                }
                record.usedInThemeFile=found;
                if(wasUsedInSeriesFile!=record.usedInSeriesFile||wasUsedInThemeFile!=record.usedInThemeFile){
                }
                if(!record.usedInSeriesFile&&!record.usedInThemeFile){
                    excludeCountPos++
                    if(!record.exclude)isc.logWarn("newly excluding record... "+record.name);
                    record.exclude=true;
                }else if(record.usedInSeriesFile||record.usedInThemeFile){
                    excludeCountNeg++;
                    if(record.exclude)isc.logWarn("newly including record... "+record.name);
                    record.exclude=false;
                }
                continue;
                if(!record.usedInSeriesFile&&!record.usedInThemeFile){
                    record.exclude=(record.name.endsWith("_hue")||
                        record.name.endsWith("_saturation")||
                        record.name.endsWith("_lightness"));
                }else{
                    record.exclude=false;
                }
            }
            if(transforms.removeUsedBy){
                delete record.usedBy;
            }
            ds.updateData(record);
        }
    }
,isc.A.exportToNewDSFormat=function isc_c_SkinFunc_exportToNewDSFormat(ds){
        var data=ds.cacheData,
            newDS=isc.DS.get("skinVariables"),
            recordCount=0
        ;
        data.setSort({property:"id",direction:"ascending"});
        for(var i=0;i<data.length;i++){
            var item=isc.addProperties({},data[i]);
            if(item.exclude==true)continue;
            if(item.exclude==null)item.exclude=false;
            if(item.superKey==item.derivesFrom)delete item.superKey;
            delete item.usedInThemeFile;
            delete item.usedBy;
            item.id=++recordCount;
            newDS.addData(item);
        }
    }
);
isc.B._maxIndex=isc.C+23;

isc.defineClass("SkinSeries");
isc.A=isc.SkinSeries.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.seriesName="Flat";
isc.A.seriesFilePath="_baseFlat.scss";
isc.A.baseFile=null;
isc.A.dynamicFile=null;
isc.A.generatorProps={
    };
isc.B.push(isc.A.init=function isc_SkinSeries_init(){
        this.Super("init",arguments);
        if(this.seriesName)this.loadSeries(this.seriesName,this.themeNames,this.loadCallback);
    }
,isc.A.loadSeries=function isc_SkinSeries_loadSeries(seriesName,themeNames,callback){
        isc.logWarn("Loading '"+this.seriesName+"' Series...");
        if(themeNames&&!isc.isAn.Array(themeNames))themeNames=[themeNames];
        var SF=isc.SkinFunc,
            _callback=callback,
            _series=this
        ;
        isc.DS.get("skinSeries").fetchData({name:seriesName},function(resp,data,req){
            _series.record=data[0];
            _series.parseSeriesFile(_series.record.baseCSS);
            if(_callback)_callback(_series);
        });
    }
,isc.A.parseSeriesFile=function isc_SkinSeries_parseSeriesFile(data){
        this.baseFile={
            name:"_base"+this.seriesName+".scss",
            content:data
        };
        this.baseFile.variablesScript=this.readSection("skin_default_variables");
        this.baseFile.headerDocScript=this.readSection("skin_header_doc");
        this.baseFile.stylesScript=this.readSection("skin_base_styles");
    }
,isc.A.writeSeriesBaseFile=function isc_SkinSeries_writeSeriesBaseFile(path){
        this._writePath=path;
        this.getVariableScript(path,{target:this,methodName:"_writeSeriesBaseFile"});
    }
,isc.A.getVariableScript=function isc_SkinSeries_getVariableScript(path,callback){
        var _this=this;
        isc.DS.get("skinVariables").fetchData({},function(response,data){
            var result=isc.SkinFunc.getVariableScript(data,
                isc.addProperties({},_this.generatorProps,{returnDefaults:true})
            );
            result=isc.SkinFunc.getSectionContent("skin_default_variables",result);
            if(callback){
                this.fireCallback(callback,["variableScript"],[result]);
            }
        });
    }
,isc.A.loadThemes=function isc_SkinSeries_loadThemes(themeNames,callback){
        var _callback=callback,
            _series=this
        ;
        this.themes=[];
        this._loadingThemes=isc.shallowClone(themeNames);
        isc.logWarn("Loading '"+this.seriesName+"' Themes...");
        for(var i=0;i<themeNames.length;i++){
            var _themeName=themeNames[i];
            var theme=isc.SkinTheme.create({
                ID:"theme_"+_themeName,
                series:_series,
                themeName:_themeName,
                themeLoaded:function(){
                    _series.themeLoaded(this,_callback)
                }
            });
            this.themes.add(theme);
            theme.loadTheme(_themeName);
        }
    }
,isc.A.themeLoaded=function isc_SkinSeries_themeLoaded(theme,callback){
        isc.logWarn("Theme '"+theme.themeName+"' loaded ("+this.seriesName+" series)");
        this._loadingThemes.remove(theme.themeName);
        if(this._loadingThemes.length==0){
            this.themesLoaded(callback);
        }
    }
,isc.A.themesLoaded=function isc_SkinSeries_themesLoaded(callback){
        isc.logWarn("All '"+this.seriesName+"' series Themes loaded ("+isc.echoFull(this.themes.getProperty("themeName"))+")");
        this.seriesLoaded(callback);
    }
,isc.A.seriesLoaded=function isc_SkinSeries_seriesLoaded(callback){
        isc.logWarn("'"+this.seriesName+"' series loaded...");
        if(this._loadCallback)this._loadCallback(this);
        if(callback)callback(this);
    }
,isc.A.replaceVariableNameInValue=function isc_SkinSeries_replaceVariableNameInValue(fromName,toName,value){
        var result=""+value;
        result=result.replaceAll(fromName+";",toName+";");
        result=result.replaceAll(fromName+",",toName+",");
        result=result.replaceAll(fromName+" ",toName+" ");
        result=result.replaceAll(fromName+")",toName+")");
        return result;
    }
,isc.A.renameVariables=function isc_SkinSeries_renameVariables(fromStr,toStr){
        var data=this.variablesRS.allRows,
            updatedRows=[]
        ;
        if(!fromStr.startsWith("$"))fromStr="$"+fromStr;
        for(var i=0;i<data.length;i++){
            var attr=isc.addProperties({},data[i]);
            if(attr.name.startsWith(fromStr)){
                var fromName=attr.name,
                    toName=attr.name.replace(fromStr,toStr)
                ;
                this.changeVariableName(fromName,toName);
            }
        }
    }
,isc.A.changeVariableName=function isc_SkinSeries_changeVariableName(fromName,toName){
        var data=this.variablesRS.allRows,
            updatedRows=[]
        ;
        for(var i=0;i<data.length;i++){
            var update={};
            var attr=data[i];
            if(attr.name==fromName)update.name=toName;
            if(attr.derivesFrom==fromName)update.derivesFrom=toName;
            if(attr.defaultValue==fromName)update.defaultValue=toName;
            else if(attr.defaultValue&&attr.defaultValue.contains(fromName)){
                update.defaultValue=this.replaceVariableNameInValue(fromName,toName,attr.defaultValue);
            }
            if(attr.value==fromName)update.value=toName;
            else if(attr.value&&attr.value.contains(fromName)){
                update.value=this.replaceVariableNameInValue(fromName,toName,attr.value);
            }
            if(update.name||update.derivesFrom||update.value||update.defaultValue){
                update.id=attr.id;
                updatedRows.add(update);
            }
        }
        var skinDS=isc.DS.get("skinVariables");
        for(var i=0;i<updatedRows.length;i++){
            skinDS.updateData(updatedRows[i]);
        }
        this.baseFile.content=this.replaceVariableNameInValue(fromName,toName,this.baseFile.content);
        for(var i=0;i<this.themes.length;i++){
            var theme=this.themes[i],
                data=theme.variablesDS.cacheData
            ;
            for(var j=0;j<data.length;j++){
                var attr=data[j];
                if(attr.name==fromName)attr.name=toName;
                if(attr.derivesFrom==fromName)attr.derivesFrom=toName;
                if(attr.defaultValue==fromName)attr.defaultValue=toName;
                else if(attr.defaultValue&&attr.defaultValue.contains("$")){
                    attr.defaultValue=this.replaceVariableNameInValue(fromName,toName,attr.defaultValue);
                }
                if(attr.value==fromName)attr.value=toName;
                else if(attr.value&&attr.value.contains("$")){
                    attr.value=this.replaceVariableNameInValue(fromName,toName,attr.value);
                }
            }
            theme.customFileContent=this.replaceVariableNameInValue(fromName,toName,theme.customFileContent);
        }
    }
,isc.A.addSeriesVariable=function isc_SkinSeries_addSeriesVariable(variable){
        isc.DS.get("skinVariables").addData(variable);
    }
,isc.A.readSection=function isc_SkinSeries_readSection(keyName,data){
        data=data||this.baseFile.content;
        return isc.SkinFunc.readSection(keyName,data);
    }
,isc.A.writeAllMetadata=function isc_SkinSeries_writeAllMetadata(){
        this.writeMetadataFile();
        for(var i=0;i<this.themes.length;i++){
            this.themes[i].writeMetadataFile();
        }
    }
,isc.A.writeAllOther=function isc_SkinSeries_writeAllOther(){
        this.writeSeriesBaseFile();
        for(var i=0;i<this.themes.length;i++){
            this.themes[i].writeThemeFile();
        }
    }
);
isc.B._maxIndex=isc.C+16;

isc.defineClass("SkinFile");
isc.A=isc.SkinFile.getPrototype();
isc.A.name=null;
isc.A.content="";
isc.A.sections=[]
;

isc.defineClass("SkinTheme");
isc.A=isc.SkinTheme.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.themeName=null;
isc.A.themeFileContent=null;
isc.A.themeFontData=null;
isc.A.themeVariableData=null;
isc.A.customFileContent=null;
isc.B.push(isc.A.init=function isc_SkinTheme_init(){
        this.Super("init",arguments);
    }
,isc.A.loadTheme=function isc_SkinTheme_loadTheme(themeName,callback){
        var SF=isc.SkinFunc,
            theme=this,
            _callback=callback
        ;
        theme.themeName=themeName;
        isc.DS.get("fileSystemSkin").fetchData({name:themeName},function(response,data){
            theme.record=isc.isAn.Array(data)?data[0]:data;
            theme.readThemeFileSections(theme.skinSettings);
            theme.parseThemeFile(data);
            theme.customFileContent=data.skinSettingsCustom;
            theme.themeLoaded(_callback);
        });
    }
,isc.A.themeLoaded=function isc_SkinTheme_themeLoaded(callback){
        if(callback)callback();
    }
,isc.A.getSkinSettings=function isc_SkinTheme_getSkinSettings(){
    }
,isc.A.readSection=function isc_SkinTheme_readSection(keyName,data){
        data=data||this.themeFileContent;
        return isc.SkinFunc.readSection(keyName,data);
    }
,isc.A.readThemeFileSections=function isc_SkinTheme_readThemeFileSections(data){
        this.themeFileContent=data;
        this.themeHeaderContent=this.readSection("theme_header")
        this.themeFontData=this.readSection("theme_fonts");
        this.themeVariableData=this.readSection("theme_variables");
    }
,isc.A.parseThemeFile=function isc_SkinTheme_parseThemeFile(data){
        var SM=isc.SkinMetadata;
        var list=SM.parseSettings(this.themeVariableData||"","value");
        var baseData=SM.getVariableMetadataDS().cacheData,
            newData=[]
        ;
        for(var i=0;i<baseData.length;i++){
            var record=isc.addProperties({},baseData[i]),
                lEntry=list.find("name",record.name);
            if(lEntry)record.value=lEntry.value;
            newData.add(record);
        }
        this.variablesDS=isc.SkinFunc.getVariablesDS(this.themeName+"VariablesDS",newData);
        var rs=isc.ResultSet.create({
            dataSource:this.variablesDS,
            fetchMode:"local",
            allRows:this.variablesDS.cacheData
        });
        this.variablesRS=rs;
    }
,isc.A.readMetadataFile=function isc_SkinTheme_readMetadataFile(path){
        var SF=isc.SkinFunc,
            _theme=this
        ;
        var _path=path||(SF.getOutputPath(true)+"_"+this.themeName+"_ThemeMetadata.js");
        SF.loadFile(_path,function(data){
            _theme.themeMetadata=data;
            _theme.variablesDS=isc.SkinFunc.getVariablesDS(this.themeName+"VariablesDS",data.variables);
        });
    }
,isc.A.writeMetadataFile=function isc_SkinTheme_writeMetadataFile(path){
        var SF=isc.SkinFunc,
            _theme=this
        ;
        var _path=path||(SF.getOutputPath(true)+"_"+this.themeName+"_ThemeMetadata.js");
        this.variablesDS.fetchData(null,
            function(dsResponse,data){
                var result={};
                result.themeName=_theme.themeName;
                result.variables=data;
                SF.saveFile(result,_path);
            }
        );
    }
,isc.A.writeThemeFile=function isc_SkinTheme_writeThemeFile(path){
        var SF=isc.SkinFunc;
        var _path=path;
        if(!_path){
            _path=SF.getThemeOutputPath(this.themeName)+"_Theme"+this.themeName+".scss";
        }
        var content=SF.getSectionContent("theme_header",this.themeHeaderContent);
        content+=SF.getSectionContent("theme_fonts",this.themeFontData)
        var _this=this;
        this.variablesDS.fetchData(null,
            function(dsResponse,data){
                var result=isc.SkinFunc.getVariableScript(data,
                    isc.addProperties({},_this.generatorProps,{returnDefaults:false})
                );
                content+=SF.getSectionContent("theme_variables",result);
                SF.saveFile(content,_path);
            }
        );
    }
);
isc.B._maxIndex=isc.C+10;

isc.defineClass("SkinToolStrip","ToolStrip");
isc.A=isc.SkinToolStrip.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.width="100%";
isc.A.groupMetadataDS=null;
isc.A.variableMetadataDS=null;
isc.A.showHelpButton=true;
isc.A.helpButtonDefaults={
        _constructor:"ToolStripButton",
        iconOnly:true,
        icon:"[SKINIMG]actions/help.png",
        hoverAutoFitMaxWidth:400,
        prompt:"In the Output-Group tree, left-click nodes to see their variables in the grid, "+
                "right-click nodes to see available options, or edit nodes directly to update "+
                "group Title or index.<br><br>"+
                "In the Variable Grid, left-click to manage records in the editor below, "+
                "right-click to see available options, or edit rows directly.<br><br>"+
                "<b>NOTE:<b>  You must click the 'Save Metadata' button to commit your changes "+
                "and regenerate the necessary files.",
        click:function(){
            isc.say(this.prompt,null,{autoSize:false,minWidth:800});
        }
    };
isc.A.showSaveMetadataButton=true;
isc.A.saveMetadataButtonDefaults={
        _constructor:"ToolStripButton",
        showIcon:false,
        title:"Save Metadata",
        disabled:true,
        hoverAutoFitMaxWidth:400,
        prompt:"Save the metadata and prepare for 'build skins'- does the following:<br><<br>"+
            "- update the variableMetadata and groupMetadata .json files in skinTools/data<br>"+
            "- copy _baseFlat.scss to _baseFlat_cssProps.scss (used to gen per-skin "+
                "skin_styles_editor.css, for the skinEditor)<br>"+
            "- token-replace SASS vars (starting '$') with css properties (starting --isc)<br>"+
            "- update the per-skin _Theme{name}.scss and _cssProperties.scss files with latest "+
                "variables and output groups<br>",
        click:function(){
            this.creator.saveMetadata();
            this.creator.showSaveNotification("All Files");
        }
    };
isc.A.showRegenDynamicBaseFileButton=false;
isc.A.regenDynamicBaseFileButtonDefaults={
        _constructor:"ToolStripButton",
        showIcon:false,
        autoSize:true,
        autoFit:true,
        title:"Update Dynamic Base File",
        hoverAutoFitMaxWidth:400,
        prompt:"Regenerate _base{Series}_cssProps.scss, a copy of _base{Series}.scss, "+
            "instrumented with runtime-mutable css custom properties, rather than SASS "+
            "variables.  Used to generate skin_styles_editor.css, a secondary version of "+
            "skin_styles.css, per skin, which the SkinEditor loads in order to provide live "+
            "updates in the browser.",
        click:function(){
            isc.SkinMetadata.regenSeriesDynamicBaseFile("Flat");
            this.creator.showSaveNotification("Series File");
        }
    };
isc.A.showRegenAllBaseSkinFilesButton=true;
isc.A.regenAllBaseSkinFilesButtonDefaults={
        _constructor:"ToolStripButton",
        showIcon:false,
        autoSize:true,
        autoFit:true,
        title:"Prepare Skins",
        hoverAutoFitMaxWidth:400,
        prompt:"Regenerate the skin-files with latest changes and prepare the separate "+
            "_baseFlat_cssProps.scss file used to produce a second .css file per skin "+
            "(for the skinEditor)",
        click:function(){
            var _this=this;
            isc.SkinMetadata.regenSeriesDynamicBaseFile("Flat",function(){
                isc.SkinMetadata.regenAllBaseSkinFiles(function(){
                    _this.creator.showSaveNotification("Skin Files");
                });
            });
        }
    };
isc.B.push(isc.A.initWidget=function isc_SkinToolStrip_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("helpButton");
        this.addAutoChild("saveMetadataButton");
        this.addAutoChild("regenDynamicBaseFileButton");
        this.addAutoChild("regenAllBaseSkinFilesButton");
        this.observe(this.groupMetadataDS,"dataChanged","observer.groupDataChanged()");
        this.observe(this.variableMetadataDS,"dataChanged","observer.variableDataChanged()");
    }
,isc.A.destroy=function isc_SkinToolStrip_destroy(){
        this.ignore(this.groupMetadataDS,"dataChanged");
        this.ignore(this.variableMetadataDS,"dataChanged");
    }
,isc.A.saveMetadata=function isc_SkinToolStrip_saveMetadata(){
        var _this=this;
        if(this.groupMetadataDirty){
            isc.SkinMetadata.saveGroupMetaData(this.groupMetadataDS,
                function(response){
                    _this.setMetadataDirty(false);
                }
            );
        }
        if(this.variableMetadataDirty){
            isc.SkinMetadata.saveVariableMetadata(this.variableMetadataDS,
                function(){
                    _this.setMetadataDirty(false);
                    _this.regenAllSkinFiles();
                }
            );
        }
    }
,isc.A.showSaveNotification=function isc_SkinToolStrip_showSaveNotification(source){
        isc.notify("Skins updated and prepared for 'build skins' - see developer console for details...",null,null,
            {
                position:"T",
                slideInOrigin:"T",
                autoFitWidth:true,
                autoFitMaxWidth:300
            }
        );
    }
,isc.A.groupDataChanged=function isc_SkinToolStrip_groupDataChanged(){
        this.setMetadataDirty(true,"group");
    }
,isc.A.regenAllSkinFiles=function isc_SkinToolStrip_regenAllSkinFiles(){
        isc.SkinMetadata.regenSeriesDynamicBaseFile();
        isc.SkinMetadata.regenAllBaseSkinFiles();
    }
,isc.A.variableDataChanged=function isc_SkinToolStrip_variableDataChanged(){
        this.setMetadataDirty(true,"variable");
    }
,isc.A.setMetadataDirty=function isc_SkinToolStrip_setMetadataDirty(dirty,type){
        if(!type){
            this.groupMetadataDirty=dirty;
            this.variableMetadataDirty=dirty;
        }else if(type=="group")this.groupMetadataDirty=dirty;
        else if(type=="variable")this.variableMetadataDirty=dirty;
        if(this.saveMetadataButton)this.saveMetadataButton.setDisabled(!dirty);
    }
);
isc.B._maxIndex=isc.C+8;

isc.defineClass("SkinVariablesGrid","ListGrid");
isc.A=isc.SkinVariablesGrid.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A._constructor="ListGrid";
isc.A.width="100%";
isc.A.height="*";
isc.A.showResizesBar=true;
isc.A.autoFetchData=true;
isc.A.dataFetchMode="local";
isc.A.autoSaveEdits=true;
isc.A.saveLocally=false;
isc.A.canEdit=true;
isc.A.canGroupBy=true;
isc.A.canMultiGroup=true;
isc.A.showFilterEditor=true;
isc.A.allowFilterExpressions=true;
isc.A.filterOnEnter=true;
isc.A.showRowNumbers=true;
isc.A.allowFilterExpressions=true;
isc.A.showClippedValuesOnHover=true;
isc.A.canDragRecordsOut=true;
isc.A.initialSort=[
        {property:"outputGroup",direction:"ascending"},
        {property:"outputIndex",direction:"ascending"}
    ];
isc.A.defaultFields=[
        {name:"name",width:"*"},
        {name:"title",width:"*"},
        {name:"value",width:"*",
            editorProperties:{
                changed:function(form,item,value){
                    form.setValue("defaultValue",value);
                }
            }
        },
        {name:"defaultValue",showIf:"return false;"},
        {name:"category",width:100,showIf:"return false;"},
        {name:"valueType",width:100,
            editorProperties:{
                changed:function(form,item,value){
                }
            }
        },
        {name:"valueSubType",width:100},
        {name:"outputGroup",width:150,
            editorProperties:{
                valueField:"name",
                displayField:"title",
                editorType:"SelectItem",
                optionDataSource:"groupMetadataDS",
                dataSetType:"tree",
                autoOpenTree:"all",
                dataProperties:{
                    dataFetchMode:"local"
                },
                pickListProperties:{
                    autoFitFieldWidths:true,
                    showHeader:true
                },
                pickListFields:[
                    {name:"title",width:250,title:"Group"}
                ]
            }
        },
        {name:"outputIndex",title:"Index",width:60},
        {name:"exclude",showIf:"return false;",canToggle:true}
    ];
isc.A.initialCriteria={_constructor:"AdvancedCriteria",operator:"and",
        criteria:[
            {fieldName:"exclude",operator:"equals",value:false}
        ]
    };
isc.A.contextMenu={
        _constructor:"Menu",
        autoDraw:false,
        data:[
            {title:"Add After",
                click:function(target,item,menu,colNum){
                    target.addVariableAfter(target.getSelectedRecord());
                }
            },
            {title:"Add Before",
                click:function(target,item,menu,colNum){
                    target.addVariableBefore(target.getSelectedRecord());
                }
            },
            {title:"Edit Variable",
                click:function(target,item,menu,colNum){
                    target.editVariable(target.getSelectedRecord());
                }
            },
            {isSeparator:true},
            {title:"Clear Filter",
                click:function(target,item,menu,colNum){
                    target.setCriteria(null);
                }
            },
            {isSeparator:true},
            {title:"Remove",
                click:function(target,item,menu,colNum){
                    target.removeVariable(target.getSelectedRecord());
                }
            }
        ],
        width:150
    };
isc.B.push(isc.A.recordClick=function isc_SkinVariablesGrid_recordClick(){
        this.creator.editor.editRecord(this.getSelectedRecord());
        this.creator.editor.updateUI();
    }
,isc.A.recordDoubleClick=function isc_SkinVariablesGrid_recordDoubleClick(){
    }
,isc.A.initWidget=function isc_SkinVariablesGrid_initWidget(){
        this.fields=this.defaultFields.duplicate();
        this.fields.add({
            name:"iscClass",width:150,
            valueIcons:isc.SkinMetadata.getClassIconValueIcons(),
            editorProperties:{
                valueMap:isc.SkinMetadata.getClassIconValueMap()
            },
            filterEditorProperties:{
                valueMap:isc.SkinMetadata.getClassIconValueMap()
            }
        });
        this.Super("initWidget",arguments);
    }
,isc.A.addVariableBefore=function isc_SkinVariablesGrid_addVariableBefore(record){
        return;
    }
,isc.A.addVariableAfter=function isc_SkinVariablesGrid_addVariableAfter(record){
        return;
    }
,isc.A.editVariable=function isc_SkinVariablesGrid_editVariable(record){
        return;
    }
,isc.A.removeVariable=function isc_SkinVariablesGrid_removeVariable(record){
        return;
    }
);
isc.B._maxIndex=isc.C+7;

isc.defineClass("SkinEditor","VLayout");
isc.A=isc.SkinEditor.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.defaultSeriesName="Flat";
isc.A.defaultSeriesThemeNames=["Tahoe","Stratus","Obsidian","Twilight"];
isc.A.loadSeriesButtonDefaults={
        _constructor:"IButton",
        title:"Load Series",
        autoFit:true,
        click:function(){
            this.creator.loadSeries();
        }
    };
isc.A.loadSeriesMetadataButtonDefaults={
        _constructor:"IButton",
        title:"Load Series Metadata",
        autoFit:true,
        click:function(){
            this.creator.currentSeries.readMetadataFile();
        }
    };
isc.A.saveSeriesMetadataButtonDefaults={
        _constructor:"IButton",
        title:"Save Series Metadata",
        autoFit:true,
        click:function(){
            this.creator.currentSeries.writeMetadataFile();
        }
    };
isc.A.saveSeriesBaseFileButtonDefaults={
        _constructor:"IButton",
        title:"Save Series SCSS file",
        autoFit:true,
        click:function(){
            this.creator.currentSeries.writeSeriesBaseFile();
        }
    };
isc.A.renameVariableButtonDefaults={
        _constructor:"IButton",
        title:"Rename Variable",
        autoFit:true,
        click:function(){
            var lg=this.creator.variablesGrid,
                record=lg.getSelectedRecord()
            ;
            if(!record)return;
            isc.SkinFunc.editVariableName(record,null,lg);
        }
    };
isc.A.buttonLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:1,
        layoutMargin:5,
        membersMargin:5
    };
isc.A.bodyLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:"100%",
        layoutMargin:5,
        membersMargin:5
    };
isc.A.variablesLayoutDefaults={
        _constructor:"SkinVariablesLayout",
        width:"100%",
        height:"100%",
        layoutMargin:5
    };
isc.A.skinTreeDefaults={
        _constructor:"TreeGrid",
        width:300,
        height:"100%",
        showResizeBar:true,
        dataFetchMode:"local",
        fields:[
            {name:"name"}
        ],
        showOpenIcons:false,
        showDropIcons:false,
        showSelectedIcons:true,
        closedIconSuffix:"",
        nodeClick:function(viewer,node){
            this.creator.nodeClicked(node);
        }
    };
isc.A.variableMetadataDS=null;
isc.A.groupMetadataDS=null;
isc.B.push(isc.A.nodeClicked=function isc_SkinEditor_nodeClicked(node){
        if(!node)return;
        if(node.id=="styleTester"){
            var url="../colorTester.jsp?skin="+isc.getCurrentSkinName();
            window.open(url);
        }else if(node.id=="paletteTools"){
            isc.showPaletteTools(true);
        }else if(node.id=="stateEditor"){
            var url="stateEditor.jsp?skin="+isc.getCurrentSkinName();
            window.open(url);
        }
        if(node.hasVariablesDS){
            this.setVariablesGridDataSource(node.variablesDS||node.classObj.variablesDS,node.classObj.variablesRS);
        }
    }
,isc.A.showNodePane=function isc_SkinEditor_showNodePane(node){
        switch(node.id){
            case"seriesMetadata":
                this.setVariablesGridDataSource(this.currentSeries);
            default:
        }
    }
,isc.A.gridViewForOutput=function isc_SkinEditor_gridViewForOutput(){
        var grid=this.variablesGrid;
        grid.setCriteria({exclude:false});
        grid.groupBy(["outputGroup"]);
        grid.setSort([
            {property:"outputIndex",direction:"ascending"}
        ]);
    }
,isc.A.initWidget=function isc_SkinEditor_initWidget(series){
        this.Super("initWidget",arguments);
        this.initRibbon();
        this.addAutoChild("bodyLayout");
        this.addMember(this.bodyLayout);
        this.addAutoChild("skinTree");
        this.bodyLayout.addMember(this.skinTree);
        this.initSkinTree();
        this.addAutoChild("variablesLayout");
        this.bodyLayout.addMember(this.variablesLayout);
        this.variablesGrid=this.variablesLayout.grid;
        this.variableEditor=this.variablesLayout.editor;
        this.autoLoadSeries=true;
        if(this.autoLoadSeries){
            this.loadSeries();
        }
    }
,isc.A.initRibbon=function isc_SkinEditor_initRibbon(){
        var getIconButton=function(title,clickFunc,props){
            return isc.IconButton.create(isc.addProperties({
                    title:title,
                    icon:"pieces/16/cube_blue.png",
                    largeIcon:"pieces/48/cube_blue.png",
                    click:clickFunc
                },props)
            );
        };
        var getIconMenuButton=function(title,clickFunc,props){
            return isc.IconMenuButton.create(isc.addProperties({
                    title:title,
                    icon:"pieces/16/piece_blue.png",
                    largeIcon:"pieces/48/piece_blue.png",
                    click:clickFunc
                },props)
            );
        }
        var controls=[];
        if(2==1){
            controls.add(getIconButton("Load Series",
                function(){
                    var seriesName=this.seriesUI.defaultSeriesName,
                        themeNames=this.seriesUI.defaultSeriesThemeNames.duplicate()
                    ;
                    this.seriesUI.loadSeries(seriesName,themeNames);
                },{seriesUI:this}
            ));
            controls.add(getIconButton("Read Metadata",
                function(){
                    this.seriesUI.currentSeries.readAllMetadata();
                },{seriesUI:this}
            ));
        }
        controls.add(getIconButton("Write Metadata",
            function(){
                this.seriesUI.currentSeries.writeAllMetadata();
            },{seriesUI:this}
        ));
        controls.add(getIconButton("Write SCSS Files",
            function(){
                this.seriesUI.currentSeries.writeAllOther();
            },{seriesUI:this}
        ));
        this.seriesRibbonGroup=isc.RibbonGroup.create({
            title:"Series",
            numRows:1,
            colWidths:[40,"*"],
            controls:controls,
            autoDraw:false
        });
        this.ribbonBar=isc.RibbonBar.create({
            groupTitleAlign:"center",
            groupTitleOrientation:"top"
        });
        this.ribbonBar.addGroup(this.seriesRibbonGroup,0);
        this.addMember(this.ribbonBar,0);
    }
,isc.A.initSkinTree=function isc_SkinEditor_initSkinTree(){
        var tg=this.skinTree;
        var ds=isc.DS.get("variablesDS");
        tg.setData(isc.Tree.create({
            modelType:"children",
            nameProperty:"name",
            root:{
                id:"top",name:"Skin Manager",children:[
                    {id:"seriesEditor",name:"Series Editor",children:[]},
                    {id:"utilities",name:"Tools & Utilities",children:[
                        {id:"styleTester",name:"Style Tester",children:[]},
                        {id:"paletteTools",name:"Palette Tools",children:[]},
                        {id:"stateEditor",name:"State Editor",children:[]}
                    ]}
                ]
            }
        }));
        tg.getData().openAll();
    }
,isc.A.loadSeries=function isc_SkinEditor_loadSeries(seriesName,themeNames){
        seriesName=seriesName||this.defaultSeriesName;
        themeNames=themeNames||this.defaultSeriesThemeNames.duplicate();
        var _this=this;
        isc.SkinFunc.loadSeries(seriesName,themeNames,
            function(series){
                _this.seriesLoaded(series);
            }
        );
    }
,isc.A.setVariablesGridDataSource=function isc_SkinEditor_setVariablesGridDataSource(ds,rs){
        this.variablesGrid.setDataSource(ds,this.variablesGrid.getFields());
        this.variablesGrid.setData(rs);
        this.variableEditor.setDataSource(ds);
    }
,isc.A.seriesLoaded=function isc_SkinEditor_seriesLoaded(series){
        this.currentSeries=series;
        var tree=this.skinTree.getData(),
            nSeriesEditor=tree.find("id","seriesEditor")
        ;
        var nSeries=tree.add({id:"_series_"+series.seriesName,name:series.seriesName+" Series",classObj:series},nSeriesEditor);
        var nSeriesMetaData=tree.add({id:series.seriesName+"MetadataFile",name:"Skin Variables",hasVariablesDS:true,classObj:series},nSeries);
        var nSeriesBaseFile=tree.add({id:series.seriesName+"BaseFile",name:"Base SCSS File",classObj:series},nSeries);
        var nThemes=tree.add({id:series.seriesName+"SeriesThemes",name:"Themes",children:[]},nSeries);
        for(var i=0;i<series.themes.length;i++){
            var theme=series.themes[i],
                node={}
            ;
            node.id="_theme_"+theme.themeName;
            node.name=theme.themeName;
            node.hasVariablesDS=true
            node.classObj=theme;
            node.children=[
                {id:"_theme_file_"+node.name,name:"Theme SCSS File",classObj:theme},
                {id:"_theme_variables_"+node.name,name:"Theme Variables",hasVariablesDS:true,classObj:theme},
                {id:"_theme_custom_"+node.name,name:"Custom Styles",classObj:theme},
                {id:"_theme_showcase_"+node.name,name:"Showcase Styles",classObj:theme},
                {id:"_theme_fonts_"+node.name,name:"Theme Fonts",classObj:theme}
            ];
            tree.add(node,nThemes);
        }
        tree.openFolders([nSeriesEditor,nSeries,nThemes]);
        this.skinTree.selectRecord(nSeriesMetaData);
        this.nodeClicked(nSeriesMetaData);
        this.delayCall("gridViewForOutput");
    }
);
isc.B._maxIndex=isc.C+9;

isc.defineClass("SkinVariablesLayout","VLayout");
isc.A=isc.SkinVariablesLayout.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.membersMargin=10;
isc.A.gridButtonLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:1,
        layoutMargin:5,
        membersMargin:5
    };
isc.A.viewAllButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/add.png",
        title:"View All",
        autoFit:true,
        autoParent:"gridButtonLayout",
        click:function(){
            var grid=this.creator.variablesGrid;
            grid.clearGroupBy();
            grid.setSort({property:"name",direction:"ascending"});
        }
    };
isc.A.viewForOutputButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/sort.png",
        title:"View for Output",
        autoFit:true,
        autoParent:"gridButtonLayout",
        click:function(){
            this.creator.gridViewForOutput()
        }
    };
isc.A.gridDefaults={
        _constructor:"SkinVariablesGrid",
        addVariableBefore:function(record){
            this.creator.addVariable("before",record);
        },
        addVariableAfter:function(record){
            this.creator.addVariable("after",record);
        },
        editVariable:function(record){
            this.creator.editVariable(record);
        },
        removeVariable:function(record){
            this.creator.removeVariable(record);
        }
    };
isc.A.editorDefaults={
        _constructor:"SkinVariableEditor",
        width:"100%",
        height:1,
        overflow:"visible"
    };
isc.A.variableMetadataDS=null;
isc.A.groupMetadataDS=null;
isc.B.push(isc.A.initWidget=function isc_SkinVariablesLayout_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("grid",{dataSource:this.variableMetadataDS});
        this.addAutoChild("editor",{
            dataSource:this.variableMetadataDS,
            groupMetadataDS:this.groupMetadataDS
        });
    }
,isc.A.addVariable=function isc_SkinVariablesLayout_addVariable(position,positionFrom,newRecord){
        if(!positionFrom&&!newRecord){
            isc.say("Select a record to copy from the top grid.");
            return;
        }
        var records=this.variableMetadataDS.cacheData,
            record=newRecord||records.find("name",positionFrom.name);
        if(record){
            record=this.grid.getCleanRecordData(record);
            record.id=records.getProperty("id").max()+1;
            if(position=="before")record.outputIndex-=2;
            else if(position=="after")record.outputIndex+=2;
            else record.outputIndex=10;
            record.name=null;
            record.title=null;
            record.valueType=null;
            record.valueSubType=null;
            record.category=null;
            record.derivesFrom=null;
            record.basic=1;
            this.editor.addRecord(record);
            return;
        }
    }
,isc.A.editVariable=function isc_SkinVariablesLayout_editVariable(record){
        this.editor.editRecord(record);
        this.editor.disableUI(false);
    }
,isc.A.removeVariable=function isc_SkinVariablesLayout_removeVariable(record){
        this.grid.removeData(record);
    }
);
isc.B._maxIndex=isc.C+4;

isc.SkinFunc.editSkinVariable=function(record,ds){
    var ed=isc.SkinVariableEditor.create({
        dataSource:ds
    });
    isc.Window.create({
        width:"80%",
        height:"80%",
        backgroundColor:"white",
        title:"Edit Skin Variable",
        children:[
            ed
        ],
        autoCenter:true
    });
    ed.editRecord(record);
}
isc.defineClass("SkinVariableEditor","VLayout");
isc.A=isc.SkinVariableEditor.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.membersMargin=10;
isc.A.layoutMargin=10;
isc.A.buttonLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:1,
        membersMargin:10
    };
isc.A.addButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/add.png",
        title:"Add Variable",
        click:function(){
            this.creator.addRecord();
        }
    };
isc.A.editButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/edit.png",
        title:"Edit",
        click:function(){
            this.creator.disableUI(false);
        }
    };
isc.A.saveButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/save.png",
        title:"Save",
        showDisabledIcon:false,
        click:function(){
            this.creator.saveRecord();
        }
    };
isc.A.cancelButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/cancel.png",
        title:"Cancel",
        showDisabledIcon:false,
        click:function(){
            this.creator.cancelEdit();
        }
    };
isc.A.renameButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/exclamation.png",
        title:"Rename",
        showDisabledIcon:false,
        click:function(){
            this.creator.renameVariable();
        }
    };
isc.A.removeButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/remove.png",
        title:"Remove",
        showDisabledIcon:false,
        click:function(){
            this.creator.removeVariable();
        }
    };
isc.A.editorDefaults={
        _constructor:"DynamicForm",
        width:"100%",
        numCols:8
    };
isc.B.push(isc.A.initWidget=function isc_SkinVariableEditor_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("buttonLayout");
        this.addMember(this.buttonLayout);
        this.addAutoChildren(["addButton","editButton","saveButton",
            "cancelButton","renameButton","removeButton"]);
        this.buttonLayout.addMembers([this.addButton,this.editButton,this.saveButton,
            this.cancelButton,this.renameButton,this.removeButton]);
        this.defaultFields=[
            {name:"id",showIf:"false",width:"*"},
            {name:"name",
                blur:function(){
                    var v=this.getValue();
                    if(v&&v.length>0){
                        var form=this.form;
                        v=v.trim();
                        while(v.startsWith("$")){v=v.substring(1)};
                        while(v.endsWith(":")){v=v.substring(0,v.length-1)};
                        this.form.getItem("title").parseNameToTitle(v);
                        v="$"+v;
                        this.setValue(v);
                        var vtItem=form.getItem("valueType");
                        var vstItem=form.getItem("valueSubType");
                        var cItem=form.getItem("category");
                        cItem.clearValue();
                        vstItem.clearValue();
                        vtItem.clearValue();
                        var eIndex=v.lastIndexOf("_");
                        var eStr=(eIndex>=0?v.substring(eIndex):v).toLowerCase();
                        if(eStr=="_bgcolor"||eStr=="_background_color"||eStr=="_backgroundcolor"){
                            vstItem.clearValue();
                            vtItem.setValue("color");
                            vstItem.setValue("background");
                            cItem.setValue("color");
                        }else if(eStr=="_border_color"||eStr=="_bordercolor"){
                            vstItem.clearValue();
                            vtItem.setValue("color");
                            vstItem.setValue("border");
                            cItem.setValue("color");
                        }else if(eStr=="_color"||eStr=="_textcolor"){
                            vstItem.clearValue();
                            vtItem.setValue("color");
                            vstItem.setValue("color");
                            cItem.setValue("color");
                        }else if(eStr.startsWith("_border")){
                            vstItem.clearValue();
                            cItem.setValue("border");
                            vtItem.setValue("border");
                            if(eStr=="_border")vstItem.setValue("border");
                            else if(eStr.contains("width"))vstItem.setValue("width");
                            else if(eStr.contains("radius"))vstItem.setValue("radius");
                        }else if(eStr.contains("padding")){
                            vstItem.clearValue();
                            vtItem.setValue("padding");
                            vstItem.setValue("padding");
                            cItem.setValue("padding");
                        }else if(eStr.contains("margin")){
                            vstItem.clearValue();
                            vtItem.setValue("margin");
                            vstItem.setValue("margin");
                            cItem.setValue("margin");
                        }else if(eStr.startsWith("_font")){
                            vstItem.clearValue();
                            cItem.setValue("font");
                            vtItem.setValue("font");
                            if(eStr=="_font"||eStr.contains("family"))vstItem.setValue("family");
                            else if(eStr.contains("size"))vstItem.setValue("size");
                            else if(eStr.contains("weight"))vstItem.setValue("weight");
                            else if(eStr.contains("align"))vstItem.setValue("align");
                        }else if(eStr.contains("line")&&eStr.contains("height")){
                            vstItem.clearValue();
                            vtItem.setValue("font");
                            vstItem.setValue("lineheight");
                            cItem.setValue("font");
                        }else if(eStr.contains("text")&&eStr.contains("align")){
                            vstItem.clearValue();
                            vtItem.setValue("font");
                            vstItem.setValue("align");
                            cItem.setValue("font");
                        }
                    }
                }
            },
            {name:"title",width:"*",
                parseNameToTitle:function(name){
                    if(!name||name=="")return;
                    var result=name[0].toUpperCase();
                    for(var i=1;i<name.length;i++){
                        var ch=name[i];
                        if(ch=="_"){
                            result+=" ";
                            i++;
                            ch=name[i];
                            result+=ch.toUpperCase();
                        }else{
                            result+=ch;
                        }
                    }
                    this.setValue(result);
                }
            },
            {name:"valueType",width:"*",
                valueMap:this.getPickerValueMap("valueType"),
                changed:function(form,item,value){
                    form.getItem("valueSubType").clearValue();
                    form.getItem("valueSubType").invalidateDisplayValueCache();
                    form.creator.filterValueSubTypeItem(value);
                }
            },
            {name:"valueSubType",title:"Sub-type",editorType:"SelectItem",width:"*"
            },
            {name:"category",title:"Category",
                valueMap:this.getPickerValueMap("category")
            },
            {name:"value",
                blur:function(){
                    var v=this.getValue();
                    var value=v;
                    if(v&&v.length>0){
                        v=v.trim();
                        while(v.endsWith(";")){v=v.substring(0,v.length-1)};
                        if(v!=value)this.setValue(v);
                        this.form.setValue("defaultValue",v);
                        if(v.startsWith("$")&&!v.contains(" ")){
                            var _form=this.form;
                            this.form.dataSource.fetchData({"name":v},function(response,data){
                                if(data&&data.length==1){
                                    _form.getItem("derivesFrom").setValue(data[0].name);
                                }
                            });
                        }
                    }
                }
            },
            {name:"derivesFrom",
                editorProperties:{autoFetchData:true,addUnknownValues:false},
                editorType:"ComboBoxItem",
                optionDataSource:this.dataSource,
                valueField:"name",
                displayField:"name"
            },
            {name:"outputGroup",
                editorProperties:{
                    valueField:"name",
                    displayField:"title",
                    editorType:"SelectItem",
                    optionDataSource:"groupMetadataDS",
                    dataSetType:"tree",
                    autoOpenTree:"all",
                    pickListProperties:{
                        autoFitFieldWidths:true,
                        showHeader:true
                    },
                    pickListFields:[
                        {name:"title",width:250,title:"Group"}
                    ]
                }
            },
            {name:"outputIndex"},
            {
                name:"iscClass",
                valueIcons:isc.SkinMetadata.getClassIconValueIcons(),
                valueMap:isc.SkinMetadata.getClassIconValueMap()
            }
        ];
        this.addAutoChild("editor",{dataSource:this.dataSource,fields:this.defaultFields});
        this.addMember(this.editor);
        if(this.record)this.editRecord(this.record);
        this.disableUI(true);
    }
,isc.A.getPickerValueMap=function isc_SkinVariableEditor_getPickerValueMap(fieldName){
        var data=this.dataSource.cacheData;
        return data.getProperty(fieldName).getUniqueItems();
    }
,isc.A.getValueSubTypeList=function isc_SkinVariableEditor_getValueSubTypeList(valueType){
        var data=this.dataSource.cacheData;
        var list=!valueType?data:data.findAll("valueType",valueType);
        var result=list.getProperty("valueSubType").getUniqueItems();
        return result;
    }
,isc.A.filterValueSubTypeItem=function isc_SkinVariableEditor_filterValueSubTypeItem(valueType){
        var result=this.getValueSubTypeList(valueType);
        var item=this.editor.getItem("valueSubType");
        item.invalidateDisplayValueCache();
        item.setValueMap(result);
    }
,isc.A.disableUI=function isc_SkinVariableEditor_disableUI(disable){
        this.updateUI(disable);
    }
,isc.A.updateUI=function isc_SkinVariableEditor_updateUI(disable){
        if(disable==null)disable=!this.addButton.isDisabled();
        this.addButton.setDisabled(!disable);
        this.editButton.setDisabled(!disable);
        this.renameButton.setDisabled(true);
        this.removeButton.setDisabled(this.editor.getValue("id")==null
            ||this.editor.getSaveOperationType()=="add"
        );
        this.saveButton.setDisabled(disable);
        this.cancelButton.setDisabled(disable);
        this.editor.setDisabled(disable);
    }
,isc.A.setDataSource=function isc_SkinVariableEditor_setDataSource(dataSource){
        this.dataSource=dataSource;
        this.editor.setDataSource(this.dataSource,isc.shallowClone(this.defaultFields));
    }
,isc.A.editRecord=function isc_SkinVariableEditor_editRecord(record){
        this._mode="edit";
        this.editor.editRecord(record);
    }
,isc.A.cancelEdit=function isc_SkinVariableEditor_cancelEdit(){
        this._mode="none";
        this.disableUI(true);
        this.editor.resetValues();
    }
,isc.A.getNextDSId=function isc_SkinVariableEditor_getNextDSId(){
        var lastId=this.creator.variablesGrid.data.getProperty("id").max();
        return lastId+1;
    }
,isc.A.addRecord=function isc_SkinVariableEditor_addRecord(defaults){
        defaults=defaults||{};
        defaults.exclude=false;
        this._mode="add";
        this.disableUI(false);
        this.editor.clearValues();
        this.editor.editNewRecord(defaults);
    }
,isc.A.clearRecord=function isc_SkinVariableEditor_clearRecord(){
        this._mode=null;
        this.disableUI(true);
        this.editor.clearValues();
    }
,isc.A.renameVariable=function isc_SkinVariableEditor_renameVariable(){
        var series=isc.SkinFunc.currentSeries,
            attr=this.editor.getItem("name").getValue()
        ;
        isc.logWarn("name is "+attr);
        isc.SkinFunc.editVariableName(attr,series,this.creator.variablesGrid);
    }
,isc.A.removeVariable=function isc_SkinVariableEditor_removeVariable(){
        this.editor.getDataSource().removeData(this.editor.getValues());
        this.clearRecord();
        this.updateUI();
    }
,isc.A.saveRecord=function isc_SkinVariableEditor_saveRecord(defaults){
        var _this=this;
        this.editor.saveData(function(dsResponse,data){
            if(dsResponse.status==0){
                isc.say("Variable saved.");
                _this.clearRecord();
                if(_this._mode=="add")_this.recordAdded(data);
                else _this.recordSaved(data);
            }
        });
    }
,isc.A.recordAdded=function isc_SkinVariableEditor_recordAdded(record){
    }
,isc.A.recordSaved=function isc_SkinVariableEditor_recordSaved(record){
    }
);
isc.B._maxIndex=isc.C+17;

isc.defineClass("SkinColorEditor","DynamicForm");
isc.A=isc.SkinColorEditor.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.membersMargin=10;
isc.A.layoutMargin=10;
isc.A.buttonLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:1,
        membersMargin:10
    };
isc.A.addButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/add.png",
        title:"Add Variable",
        click:function(){
            this.creator.addRecord();
        }
    };
isc.A.saveButtonDefaults={
        _constructor:"IButton",
        icon:"[SKINIMG]actions/save.png",
        title:"Save",
        click:function(){
            this.creator.saveRecord();
        }
    };
isc.A.editorDefaults={
        _constructor:"DynamicForm",
        width:"100%",
        numCols:6
    };
isc.B.push(isc.A.initWidget=function isc_SkinColorEditor_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("buttonLayout");
        this.addMember(this.buttonLayout);
        this.addAutoChildren(["addButton","saveButton"]);
        this.buttonLayout.addMembers([this.addButton,this.saveButton]);
        this.addAutoChild("editor",{dataSource:this.dataSource});
        this.addMember(this.editor);
    }
,isc.A.setDataSource=function isc_SkinColorEditor_setDataSource(dataSource){
        this.dataSource=dataSource;
        this.editor.setDataSource(this.dataSource);
    }
,isc.A.editRecord=function isc_SkinColorEditor_editRecord(record){
        this._mode="edit";
        this.editor.editRecord(record);
    }
,isc.A.addRecord=function isc_SkinColorEditor_addRecord(defaults){
        this._mode="add";
        this.editor.editNewRecord(defaults);
    }
,isc.A.clearRecord=function isc_SkinColorEditor_clearRecord(){
        this._mode=null;
        this.editor.clearValues();
    }
,isc.A.saveRecord=function isc_SkinColorEditor_saveRecord(defaults){
        var _this=this;
        this.editor.saveData(function(dsResponse,data){
            if(!dsResponse.status==0){
                isc.say("Variable saved.");
                _this.clearRecord();
                if(_this._mode=="add")_this.recordAdded(data);
                else _this.recordSaved(data);
            }
        });
    }
,isc.A.recordAdded=function isc_SkinColorEditor_recordAdded(record){
    }
,isc.A.recordSaved=function isc_SkinColorEditor_recordSaved(record){
    }
);
isc.B._maxIndex=isc.C+8;

isc.defineClass("ColorTransformer","VLayout");
isc.A=isc.ColorTransformer.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoDraw=true;
isc.A.formDefaults={
        _constructor:"DynamicForm",
        numCols:6,
        minWidth:600,
        minColWidth:900,
        colWidths:[100,120,100,120,100,120],
        fields:[
            {name:"inputColor",width:"*",editorType:"ColorItem",title:"Color",
                changed:function(form,item,value){
                    form.creator.setColor(value);
                }
            },
            {name:"transform",editorType:"SelectItem",title:"Transform",width:"*",
                valueMap:isc.SkinFunc.transformTypes,
                changed:function(form,item,value){
                    if(value=="custom"||value=="none"){
                        form.hideItem("transformDelta");
                        if(value=="custom"){
                            form.showItem("customTransform");
                        }
                    }else{
                        form.hideItem("customTransform");
                        form.showItem("transformDelta");
                    }
                    form.creator.changeTransform(value);
                }
            },
            {name:"transformedColor",editorType:"ColorItem",width:"*",title:"Result"},
            {name:"transformDelta",type:"integer",width:"*",editorType:"SliderItem",
                title:"Change By %",
                height:30,
                min:0,max:100,
                colSpan:"*",
                sliderProperties:{showRange:false},
                visible:false,
                changed:function(form,item,value){
                    form.creator.changeTransformDelta(value);
                }
            },
            {
                name:"customTransform",
                editorType:"TextAreaItem",title:"Custom",
                showHintInField:true,
                hint:"Javascript function-body that returns a color value",
                width:"*",
                height:60,
                colSpan:"*",
                visible:false,
                changeOnKeypress:false,
                changeOnEnter:true,
                changed:function(form,item,value){
                    form.creator.changeCustomTransform(value);
                }
            }
        ]
    };
isc.A.transform="none";
isc.A.transformDelta=0;
isc.B.push(isc.A.initWidget=function isc_ColorTransformer_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("form");
        this.addMember(this.form);
        if(this.color)this.setColor(this.color);
    }
,isc.A.setColor=function isc_ColorTransformer_setColor(color){
        this.inputColor=color;
        this.color=isc.tinycolor(color);
        if(this.transformDelta)this.startTransformDelta=this.transformDelta;
        this.updateForm();
    }
,isc.A.changeTransform=function isc_ColorTransformer_changeTransform(transform){
        this.transform=transform;
        this.updateForm();
    }
,isc.A.changeTransformDelta=function isc_ColorTransformer_changeTransformDelta(delta){
        this.transformDelta=delta;
        this.updateForm();
    }
,isc.A.changeCustomTransform=function isc_ColorTransformer_changeCustomTransform(value){
        this.customTransform=value;
        this.updateForm();
    }
,isc.A.updateForm=function isc_ColorTransformer_updateForm(){
        var c=isc.tinycolor(this.color);
        if(c.isValid()){
            var hexColor=c.toHexString();
            if(this.transform=="custom"){
                var theFunc=isc.isA.Function(this.customTransform)?this.customTransform:
                        isc._makeFunction("color",this.customTransform);
                this.transformedColor=theFunc.apply(this,[c]);
            }else if(this.transform=="none"){
                this.transformedColor=hexColor;
            }else{
                this.transformedColor=
                    isc.SkinFunc.transformColor(hexColor,this.transform,this.transformDelta);
            }
            this.form.setValues({
                "inputColor":hexColor,
                "transform":this.transform,
                "transformDelta":this.transformDelta,
                "customTransform":this.customTransform,
                "transformedColor":this.transformedColor
            });
        }else{
            this.form.setValues({"inputColor":this.inputColor});
        }
        if(this.transform=="custom")this.form.showItem("customTransform")
        else if(this.transform!="none"){
            this.form.showItem("transformDelta");
        }
    }
);
isc.B._maxIndex=isc.C+6;

isc.defineClass("ColorTransformerItem","CanvasItem");
isc.A=isc.ColorTransformerItem.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.height=1;
isc.A.overflow="visible";
isc.A.canvasConstructor="ColorTransformer";
isc.B.push(isc.A.setValue=function isc_ColorTransformerItem_setValue(newValue){
        var arr=newValue==null?null:newValue.split("::");
        if(arr&&arr.length>0){
            this.canvas.transformDelta=0;
            this.canvas.customTransform=null;
            this.canvas.transform=arr[1];
            if(arr[1]!="none"){
                if(arr.length>2){
                    if(this.transform=="custom"){
                        this.canvas.customTransform=arr[1];
                    }else{
                        this.canvas.transformDelta=arr[1];
                    }
                }
            }
            this.canvas.setColor(arr[0]);
        }
    }
,isc.A.getValue=function isc_ColorTransformerItem_getValue(){
        var f=this.canvas,
            result=f.transform;
        if(result!="none"){
            result+="::";
            if(result=="custom"){
                result+=f.customTransform;
            }else{
                result+=f.transformDelta;
            }
        }
        return result;
    }
);
isc.B._maxIndex=isc.C+2;

isc.defineClass("SkinVariableGroupEditor","VLayout");
isc.A=isc.SkinVariableGroupEditor.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.buttonLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:1
    };
isc.A.addButtonDefaults={
        _constructor:"IButton",
        title:"Add Group",
        autoFit:true,
        autoParent:"buttonLayout",
        click:function(){
            this.creator.addGroup();
        }
    };
isc.A.editButtonDefaults={
        _constructor:"IButton",
        title:"Edit",
        autoFit:true,
        autoParent:"buttonLayout",
        click:function(){
            this.creator.startEditing();
        }
    };
isc.A.saveButtonDefaults={
        _constructor:"IButton",
        title:"Save",
        autoFit:true,
        autoParent:"buttonLayout",
        click:function(){
            this.creator.saveRecord();
        }
    };
isc.A.cancelButtonDefaults={
        _constructor:"IButton",
        title:"Cancel",
        autoFit:true,
        autoParent:"buttonLayout",
        click:function(){
            this.creator.cancelEdit();
        }
    };
isc.A.formDefaults={
        _constructor:"DynamicForm"
    };
isc.B.push(isc.A.initWidget=function isc_SkinVariableGroupEditor_initWidget(){
        this.Super("initWidget",arguments);
        this.addAutoChild("buttonLayout");
        this.addMember(this.buttonLayout);
        this.addAutoChildren(["addButton","editButton","saveButton","cancelButton"]);
        var lFields=[
            {name:"parentId",title:"Parent",valueField:"name",displayField:"title",
                optionDataSource:"groupMetadataDS",dataSetType:"tree",defaultValue:"none"
            },
            {name:"name"},
            {name:"title"},
            {name:"comment"},
            {name:"index"},
            {
                name:"iscClass",
                valueIcons:isc.SkinMetadata.getClassIconValueIcons(),
                valueMap:isc.SkinMetadata.getClassIconValueMap()
            }
        ];
        this.addAutoChild("form",{dataSource:this.dataSource,fields:lFields});
        this.addMember(this.form);
    }
,isc.A.editRecord=function isc_SkinVariableGroupEditor_editRecord(record){
        this.form.editRecord(record);
    }
,isc.A.editNewRecord=function isc_SkinVariableGroupEditor_editNewRecord(record){
        this.form.editNewRecord(record);
    }
,isc.A.saveRecord=function isc_SkinVariableGroupEditor_saveRecord(){
        var values=this.form.getValues();
        if(!values.parentId||values.parentId=="")values.parentId="none";
        if(this.form.saveOperationType=="add")this.dataSource.addData(values);
        else this.dataSource.updateData(values)
        this.hide();
    }
,isc.A.cancelEdit=function isc_SkinVariableGroupEditor_cancelEdit(){
        this.hide();
    }
);
isc.B._maxIndex=isc.C+5;

isc.defineClass("SkinVariableGroupTree","TreeGrid");
isc.A=isc.SkinVariableGroupTree.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoFetchData=true;
isc.A.canAcceptDroppedRecords=true;
isc.A.canReparentNodes=true;
isc.A.dataFetchMode="local";
isc.A.dataProperties={
        loadDataOnDemand:false,
        autoOpenRoot:"root"
    };
isc.A.showFilterEditor=true;
isc.A.allowFilterExpressions=true;
isc.A.fields=[
        {name:"name",showIf:"false"},
        {name:"title",width:"*",canFilter:true},
        {name:"index",width:70}
    ];
isc.A.initialSort=[{property:"index",direction:"ascending"}];
isc.A.sortByGroupfirst=true;
isc.A.groupEditorDefaults={
        _constructor:"SkinVariableGroupEditor",
        backgroundColor:"white"
    };
isc.A.contextMenu={
        _constructor:"Menu",
        autoDraw:false,
        data:[
            {title:"Add Child Group",
                click:function(target,item,menu,colNum){
                    target.addChildGroup(target.getSelectedRecord());
                }
            },
            {title:"Add Root Group",
                click:function(target,item,menu,colNum){
                    target.addChildGroup(null);
                }
            },
            {title:"Edit Group",
                click:function(target,item,menu,colNum){
                    target.editGroup(target.getSelectedRecord());
                }
            },
            {title:"Remove Group",
                click:function(target,item,menu,colNum){
                    target.removeGroup(target.getSelectedRecord());
                }
            },
            {isSeparator:true},
            {title:"Add Variable",
                click:function(target,item,menu,colNum){
                    target.addVariableToGroup(target.getSelectedRecord(),null);
                }
            }
        ],
        width:150
    };
isc.B.push(isc.A.dataArrived=function isc_SkinVariableGroupTree_dataArrived(){
        this.data.openAll();
        var list=this.data.getOpenList();
        list.map(function(item){item.isFolder=true});
    }
,isc.A.dataChanged=function isc_SkinVariableGroupTree_dataChanged(){
        this.data.openAll();
        var list=this.data.getOpenList();
        list.map(function(item){item.isFolder=true});
    }
,isc.A.nodeClick=function isc_SkinVariableGroupTree_nodeClick(viewer,node,recordNum){
        if(!this.data.isOpen(node))this.openFolder(node);
        this.Super("nodeClick",arguments);
    }
,isc.A.initWidget=function isc_SkinVariableGroupTree_initWidget(){
        this.Super("initWidget",arguments);
        this.nodeIcon=this.folderIcon;
    }
,isc.A.getGroupEditor=function isc_SkinVariableGroupTree_getGroupEditor(){
        if(!this.groupEditor){
            this.groupEditor=this.createAutoChild("groupEditor",{dataSource:this.dataSource});
        }
        return this.groupEditor;
    }
,isc.A.addChildGroup=function isc_SkinVariableGroupTree_addChildGroup(parent){
        var ed=this.getGroupEditor(),
            props={parentId:null,iscClass:null}
        ;
        if(parent){
            props.parentId=parent.name;
            props.name=parent.name+"_";
            if(parent.iscClass){
                props.iscClass=parent.iscClass;
                var imageRecord=isc.Class.getClassIcon(props.iscClass);
                if(imageRecord){
                    props.icon=imageRecord.src;
                }
            }
        }
        ed.editNewRecord(props);
        this.showEditor();
    }
,isc.A.addVariableToGroup=function isc_SkinVariableGroupTree_addVariableToGroup(group){
        this.creator.variablesLayout.addVariable("end",null,{outputGroup:group.name});
    }
,isc.A.showEditor=function isc_SkinVariableGroupTree_showEditor(){
        var ed=this.getGroupEditor();
        if(!ed.isDrawn())ed.draw();
        ed.moveTo((isc.Page.getWidth()/2)-(ed.getWidth()/2),(isc.Page.getHeight()/2)-(ed.getHeight()/2));
        ed.show();
    }
,isc.A.editGroup=function isc_SkinVariableGroupTree_editGroup(record){
        var ed=this.getGroupEditor();
        var rec=this.data.getCleanNodeData(record);
        ed.editRecord(rec);
        this.showEditor();
    }
,isc.A.removeGroup=function isc_SkinVariableGroupTree_removeGroup(record){
        this.getDataSource().removeData(record);
    }
,isc.A.folderDrop=function isc_SkinVariableGroupTree_folderDrop(nodes,folder,index,sourceWidget){
        if(sourceWidget!=this){
            if(sourceWidget==this.creator.grid){
                for(var i=0;i<nodes.length;i++){
                    nodes[i].outputGroup=folder.name;
                    this.creator.grid.updateData(nodes[i]);
                }
                return false;
            }
        }
        return this.Super("folderDrop",arguments);
    }
);
isc.B._maxIndex=isc.C+11;

isc.defineClass("SkinMetadataEditor","VLayout");
isc.A=isc.SkinMetadataEditor.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.toolStripDefaults={
        _constructor:"SkinToolStrip"
    };
isc.A.groupTreeDefaults={
        _constructor:"SkinVariableGroupTree",
        width:300,
        showResizeBar:true,
        autoParent:"bodyLayout",
        canEdit:true,
        nodeClick:function(viewer,node,recordNum){
            this.creator.showGroupVariables(node);
        }
    };
isc.A.variablesLayoutDefaults={
        _constructor:"SkinVariablesLayout",
        width:"*",
        height:"100%",
        autoParent:"bodyLayout"
    };
isc.A.bodyLayoutDefaults={
        _constructor:"HLayout",
        width:"100%",
        height:"*"
    };
isc.A.groupMetadataDS=null;
isc.A.variableMetadataDS=null;
isc.B.push(isc.A.initWidget=function isc_SkinMetadataEditor_initWidget(){
        this.Super("initWidget",arguments);
        var SM=isc.SkinMetadata;
        if(!this.variableMetadataDS)this.variableMetadataDS=SM.getVariableMetadataDS();
        if(!this.groupMetadataDS)this.groupMetadataDS=SM.getGroupMetadataDS();
        this.addAutoChild("toolStrip",{
            groupMetadataDS:this.groupMetadataDS,
            variableMetadataDS:this.variableMetadataDS
        });
        this.addAutoChild("bodyLayout");
        this.addMember(this.bodyLayout);
        this.addAutoChild("groupTree",{dataSource:this.groupMetadataDS});
        this.addAutoChild("variablesLayout",{
            variableMetadataDS:this.variableMetadataDS,
            groupMetadataDS:this.groupMetadataDS
        });
        this.grid=this.variablesLayout.grid;
    }
,isc.A.showGroupVariables=function isc_SkinMetadataEditor_showGroupVariables(folder){
        this.grid.fetchData({fieldName:"outputGroup",operator:"iStartsWith",value:folder.name},null,{invalidateCache:true});
    }
,isc.A.getGroupEditor=function isc_SkinMetadataEditor_getGroupEditor(){
        return this.groupTree&&this.groupTree.groupEditor;
    }
,isc.A.addChildGroup=function isc_SkinMetadataEditor_addChildGroup(parent){
        if(this.groupTree)this.groupTree.addChildGroup(parent);
    }
,isc.A.editGroupRecord=function isc_SkinMetadataEditor_editGroupRecord(record){
        if(this.groupTree)this.groupTree.editGroup(record);
    }
);
isc.B._maxIndex=isc.C+5;

isc.getButtonsPane=function(){
    var paneName="colorTester_buttonsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var menu=isc.Menu.create({
        autoDraw:false,
        showShadow:true,
        shadowDepth:10,
        data:[
            {title:"New",keyTitle:"Ctrl+N",icon:"icons/16/document_plain_new.png"},
            {title:"Open",keyTitle:"Ctrl+O",icon:"icons/16/folder_out.png"},
            {isSeparator:true},
            {title:"Save",keyTitle:"Ctrl+S",icon:"icons/16/disk_blue.png"},
            {title:"Save As",icon:"icons/16/save_as.png"},
            {isSeparator:true},
            {title:"Recent Documents",icon:"icons/16/folder_document.png",submenu:[
                {title:"data.xml",checked:true},
                {title:"Component Guide.doc"},
                {title:"SmartClient.doc",checked:true},
                {title:"AJAX.doc"}
            ]},
            {isSeparator:true},
            {title:"Export as...",icon:"icons/16/export1.png",submenu:[
                {title:"XML"},
                {title:"CSV"},
                {title:"Plain text"}
            ]},
            {isSeparator:true},
            {title:"Print",enabled:false,keyTitle:"Ctrl+P",icon:"icons/16/printer3.png"}
        ]
    });
    var menuButton=isc.ToolStripMenuButton.create({
        title:"File",
        menu:menu
    });
    var printButton=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/print.png",
        title:"Print"
    });
    var alignLeft=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/text_align_left.png",
        actionType:"radio",
        radioGroup:"textAlign"
    });
    var alignRight=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/text_align_right.png",
        actionType:"radio",
        radioGroup:"textAlign"
    });
    var alignCenter=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/text_align_center.png",
        actionType:"radio",
        radioGroup:"textAlign"
    });
    var bold=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/text_bold.png",
        actionType:"checkbox",
        showFocused:false,
        showFocusOutline:true
    });
    var italics=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/text_italic.png",
        actionType:"checkbox",
        showFocused:false,
        showFocusOutline:true
    });
    var underlined=isc.ToolStripButton.create({
        icon:"[SKIN]/RichTextEditor/text_underline.png",
        actionType:"checkbox",
        showFocused:false,
        showFocusOutline:true
    });
    var fontSelector=isc.DynamicForm.create({
        showResizeBar:true,
        width:120,minWidth:50,
        numCols:1,
        fields:[
            {name:"selectFont",showTitle:false,width:"*",
             valueMap:{
                "courier":"<span style='font-family:courier'>Courier</span>",
                "verdana":"<span style='font-family:verdana'>Verdana</span>",
                "times":"<span style='font-family:times'>Times</span>"
             },defaultValue:"courier"}
        ]
    });
    var zoomSelector=isc.DynamicForm.create({
        width:100,minWidth:50,
        numCols:1,
        fields:[
            {name:"selectZoom",showTitle:false,width:"*",
             valueMap:["50%","75%","100%","150%","200%","Fit"],
             defaultValue:"100%"}
        ]
    });
    var toolStrip=isc.ToolStrip.create({
        members:[menuButton,"separator",printButton,
                  "resizer",bold,italics,underlined,
                  "separator",
                  alignLeft,alignRight,alignCenter,
                  "separator",
                  fontSelector,"resizer",zoomSelector]
    });
    var typeMenu={
        _constructor:"Menu",
        autoDraw:false,
        showShadow:true,
        shadowDepth:10,
        data:[
            {title:"Document",keyTitle:"Ctrl+D",icon:"[SKINIMG]actions/edit.png"},
            {title:"Picture",keyTitle:"Ctrl+P",icon:"[SKINIMG]actions/close.png"},
            {title:"Email",keyTitle:"Ctrl+E",icon:"[SKINIMG]actions/accept.png"}
        ]
    };
    var getIconButton=function(title,props){
        return isc.IconButton.create(isc.addProperties({
                title:title,
                icon:"[SKINIMG]actions/add.png",
                largeIcon:"[SKINIMG]actions/add.png",
                click:"isc.say(this.title + ' button clicked');"
            },props)
        );
    };
    var getIconMenuButton=function(title,props){
        return isc.IconMenuButton.create(isc.addProperties({
                title:title,
                icon:"[SKINIMG]actions/edit.png",
                largeIcon:"[SKINIMG]actions/edit.png",
                click:"isc.say(this.title + ' button clicked');"
            },props)
        );
    };
    var fileGroup=isc.RibbonGroup.create({
        title:"File (vertical icons)",
        numRows:3,
        colWidths:[40,"*"],
        titleAlign:"left",
        controls:[
            getIconMenuButton("New",{orientation:"vertical",menu:typeMenu,showMenuIconOver:false}),
            getIconButton("Open",{orientation:"vertical",largeIcon:"[SKINIMG]actions/accept.png"}),
            getIconButton("Save",{orientation:"vertical",largeIcon:"[SKINIMG]actions/save.png"}),
            getIconMenuButton("Save As",{orientation:"vertical",menu:typeMenu,largeIcon:"[SKINIMG]actions/add.png"})
        ],
        autoDraw:false
    });
    var editGroup=isc.RibbonGroup.create({
        title:"Editing Tools",
        numRows:3,
        colWidths:[40,"*"],
        controls:[
            getIconButton("Edit",{icon:"[SKINIMG]actions/edit.png"}),
            getIconButton("Copy",{icon:"[SKINIMG]actions/refresh.png"}),
            getIconButton("Paste"),
            getIconMenuButton("Undo",{menu:typeMenu,showMenuIconOver:false,icon:"[SKINIMG]actions/add.png"}),
            getIconMenuButton("Redo",{menu:typeMenu,icon:"[SKINIMG]actions/accept.png"})
        ],
        autoDraw:false
    });
    var insertGroup=isc.RibbonGroup.create({
        title:"Insert",
        numRows:3,
        colWidths:[40,"*"],
        controls:[
            getIconMenuButton("Picture",{orientation:"vertical",menu:typeMenu,largeIcon:"[SKINIMG]actions/add.png"}),
            getIconButton("Link",{icon:"[SKINIMG]actions/edit.png"}),
            getIconButton("Document",{icon:"[SKINIMG]actions/accept.png"}),
            getIconButton("Video",{icon:"[SKINIMG]actions/help.png"})
        ],
        autoDraw:false
    });
    var ribbonBar=isc.RibbonBar.create({
        groupTitleAlign:"center",
        groupTitleOrientation:"top"
    });
    ribbonBar.addGroup(fileGroup,0);
    ribbonBar.addGroup(editGroup,1);
    ribbonBar.addGroup(insertGroup,2);
    var customColumnMenu=isc.Menu.create({
        autoDismiss:false,
        fields:[
            "title",
            {name:"canDismiss",width:16,
             showValueIconOnly:true,
             valueIcons:{
                "true":"[SKINIMG]actions/close.png"
             }
            }
        ],
        data:[
            {name:"Item 1"},
            {name:"Item 2",canDismiss:true},
            {name:"Item 3",canDismiss:true}
        ],
        itemClick:function(item,colNum){
            if(colNum==1&&item.canDismiss){
                this.removeItem(item);
            }else{
                isc.say("You Selected '"+item.name+"'.");
                this.hide();
            }
        }
    });
    var menuButton1=isc.MenuButton.create({
        autoDraw:false,
        title:"Show Menu",
        menu:customColumnMenu
    });
    var buttonCSSButton=isc.Button.create({
        autoFit:true,
        title:"CSS Button",
        iconSize:12,
        icon:"[SKINIMG]headerIcons/person.png"
    });
    var buttonIButton=isc.IButton.create({
        title:"Stretch Button",
        width:150,
        iconSize:12,
        icon:"[SKINIMG]headerIcons/person.png"
    });
    var buttonImgButton=isc.ImgButton.create({
        width:18,
        height:18,
        src:"[SKIN]/ImgButton/button.png"
    });
    var navBar1=isc.NavigationBar.create({
        width:500,
        leftButtonTitle:"Back",
        rightButtonTitle:"Forward",
        showRightButton:true,
        title:"NavBar Title",
        navigationClick:function(direction){
            if(direction==="back"){
                isc.say("Back button clicked!");
            }else if(direction==="forward"){
                isc.say("Forward button clicked!");
            }
        }
    });
    var buttonsPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[menuButton1,buttonCSSButton,buttonIButton,buttonImgButton,
            navBar1,toolStrip,ribbonBar
        ]
    });
    isc.SkinUtil.testPanes[paneName]=buttonsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getCubesPane=function(){
    var paneName="colorTester_cubesPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var productData=[
        {quarter:"Q1, 2016",month:"January",region:"Western U.S.",product:"Pens",metric:"Revenue",_value:10000,percentNational:25},
        {quarter:"Q1, 2016",month:"January",region:"Western U.S.",product:"Chairs",metric:"Revenue",_value:50000,percentNational:45},
        {quarter:"Q1, 2016",month:"January",region:"Western U.S.",product:"Monitors",metric:"Revenue",_value:120000,percentNational:49},
        {quarter:"Q1, 2016",month:"January",region:"Western U.S.",product:"Pens",metric:"Profit",_value:2000,percentNational:25},
        {quarter:"Q1, 2016",month:"January",region:"Western U.S.",product:"Chairs",metric:"Profit",_value:5000,percentNational:45},
        {quarter:"Q1, 2016",month:"January",region:"Western U.S.",product:"Monitors",metric:"Profit",_value:44000,percentNational:59,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"January",region:"Midwest U.S.",product:"Pens",metric:"Revenue",_value:8000,percentNational:20},
        {quarter:"Q1, 2016",month:"January",region:"Midwest U.S.",product:"Chairs",metric:"Revenue",_value:22000,percentNational:20},
        {quarter:"Q1, 2016",month:"January",region:"Midwest U.S.",product:"Monitors",metric:"Revenue",_value:20000,percentNational:8,_hilite:"under10"},
        {quarter:"Q1, 2016",month:"January",region:"Midwest U.S.",product:"Pens",metric:"Profit",_value:2000,percentNational:25},
        {quarter:"Q1, 2016",month:"January",region:"Midwest U.S.",product:"Chairs",metric:"Profit",_value:2000,percentNational:18},
        {quarter:"Q1, 2016",month:"January",region:"Midwest U.S.",product:"Monitors",metric:"Profit",_value:5000,percentNational:7,_hilite:"under10"},
        {quarter:"Q1, 2016",month:"January",region:"Eastern U.S.",product:"Pens",metric:"Revenue",_value:22000,percentNational:55,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"January",region:"Eastern U.S.",product:"Chairs",metric:"Revenue",_value:40000,percentNational:36},
        {quarter:"Q1, 2016",month:"January",region:"Eastern U.S.",product:"Monitors",metric:"Revenue",_value:105000,percentNational:43},
        {quarter:"Q1, 2016",month:"January",region:"Eastern U.S.",product:"Pens",metric:"Profit",_value:4000,percentNational:50,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"January",region:"Eastern U.S.",product:"Chairs",metric:"Profit",_value:4000,percentNational:36},
        {quarter:"Q1, 2016",month:"January",region:"Eastern U.S.",product:"Monitors",metric:"Profit",_value:25000,percentNational:34},
        {quarter:"Q1, 2016",month:"February",region:"Western U.S.",product:"Pens",metric:"Revenue",_value:12000,percentNational:23},
        {quarter:"Q1, 2016",month:"February",region:"Western U.S.",product:"Chairs",metric:"Revenue",_value:42000,percentNational:47},
        {quarter:"Q1, 2016",month:"February",region:"Western U.S.",product:"Monitors",metric:"Revenue",_value:160000,percentNational:40},
        {quarter:"Q1, 2016",month:"February",region:"Western U.S.",product:"Pens",metric:"Profit",_value:4000,percentNational:23},
        {quarter:"Q1, 2016",month:"February",region:"Western U.S.",product:"Chairs",metric:"Profit",_value:4000,percentNational:47},
        {quarter:"Q1, 2016",month:"February",region:"Western U.S.",product:"Monitors",metric:"Profit",_value:68000,percentNational:40},
        {quarter:"Q1, 2016",month:"February",region:"Midwest U.S.",product:"Pens",metric:"Revenue",_value:10000,percentNational:19},
        {quarter:"Q1, 2016",month:"February",region:"Midwest U.S.",product:"Chairs",metric:"Revenue",_value:12000,percentNational:13},
        {quarter:"Q1, 2016",month:"February",region:"Midwest U.S.",product:"Monitors",metric:"Revenue",_value:75000,percentNational:19},
        {quarter:"Q1, 2016",month:"February",region:"Midwest U.S.",product:"Pens",metric:"Profit",_value:3000,percentNational:20},
        {quarter:"Q1, 2016",month:"February",region:"Midwest U.S.",product:"Chairs",metric:"Profit",_value:1000,percentNational:11},
        {quarter:"Q1, 2016",month:"February",region:"Midwest U.S.",product:"Monitors",metric:"Profit",_value:32000,percentNational:17},
        {quarter:"Q1, 2016",month:"February",region:"Eastern U.S.",product:"Pens",metric:"Revenue",_value:31000,percentNational:58,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"February",region:"Eastern U.S.",product:"Chairs",metric:"Revenue",_value:35000,percentNational:39},
        {quarter:"Q1, 2016",month:"February",region:"Eastern U.S.",product:"Monitors",metric:"Revenue",_value:164000,percentNational:41},
        {quarter:"Q1, 2016",month:"February",region:"Eastern U.S.",product:"Pens",metric:"Profit",_value:8000,percentNational:53,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"February",region:"Eastern U.S.",product:"Chairs",metric:"Profit",_value:4000,percentNational:44},
        {quarter:"Q1, 2016",month:"February",region:"Eastern U.S.",product:"Monitors",metric:"Profit",_value:88000,percentNational:47},
        {quarter:"Q1, 2016",month:"March",region:"Western U.S.",product:"Pens",metric:"Revenue",_value:18000,percentNational:26},
        {quarter:"Q1, 2016",month:"March",region:"Western U.S.",product:"Chairs",metric:"Revenue",_value:25000,percentNational:54,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"March",region:"Western U.S.",product:"Monitors",metric:"Revenue",_value:220000,percentNational:40},
        {quarter:"Q1, 2016",month:"March",region:"Western U.S.",product:"Pens",metric:"Profit",_value:9000,percentNational:29},
        {quarter:"Q1, 2016",month:"March",region:"Western U.S.",product:"Chairs",metric:"Profit",_value:2000,percentNational:40},
        {quarter:"Q1, 2016",month:"March",region:"Western U.S.",product:"Monitors",metric:"Profit",_value:112000,percentNational:38},
        {quarter:"Q1, 2016",month:"March",region:"Midwest U.S.",product:"Pens",metric:"Revenue",_value:7000,percentNational:10},
        {quarter:"Q1, 2016",month:"March",region:"Midwest U.S.",product:"Chairs",metric:"Revenue",_value:6000,percentNational:13},
        {quarter:"Q1, 2016",month:"March",region:"Midwest U.S.",product:"Monitors",metric:"Revenue",_value:135000,percentNational:25},
        {quarter:"Q1, 2016",month:"March",region:"Midwest U.S.",product:"Pens",metric:"Profit",_value:2000,percentNational:6,_hilite:"under10"},
        {quarter:"Q1, 2016",month:"March",region:"Midwest U.S.",product:"Chairs",metric:"Profit",_value:1000,percentNational:20},
        {quarter:"Q1, 2016",month:"March",region:"Midwest U.S.",product:"Monitors",metric:"Profit",_value:66000,percentNational:23},
        {quarter:"Q1, 2016",month:"March",region:"Eastern U.S.",product:"Pens",metric:"Revenue",_value:44000,percentNational:64,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"March",region:"Eastern U.S.",product:"Chairs",metric:"Revenue",_value:15000,percentNational:33},
        {quarter:"Q1, 2016",month:"March",region:"Eastern U.S.",product:"Monitors",metric:"Revenue",_value:190000,percentNational:35},
        {quarter:"Q1, 2016",month:"March",region:"Eastern U.S.",product:"Pens",metric:"Profit",_value:20000,percentNational:65,_hilite:"over50"},
        {quarter:"Q1, 2016",month:"March",region:"Eastern U.S.",product:"Chairs",metric:"Profit",_value:2000,percentNational:40},
        {quarter:"Q1, 2016",month:"March",region:"Eastern U.S.",product:"Monitors",metric:"Profit",_value:115000,percentNational:39}
    ];
    var cubeBasic=isc.CubeGrid.create({
        data:productData,
        width:800,
        height:400,
        hideEmptyFacetValues:true,
        valueFormat:"\u00A4,0.00",
        columnFacets:["quarter","month","metric"],
        rowFacets:["region","product"]
    });
    var cubesPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[cubeBasic]
    });
    isc.SkinUtil.testPanes[paneName]=cubesPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getFormItemsPane=function(){
    var paneName="colorTester_formItemsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var fUpdateReadOnlyDisplay=function(mode){
        mode=mode||readOnlyDisplayPickerForm.getValue("readOnlyDisplayPicker");
        favoritesForm.setReadOnlyDisplay(mode);
        form1.setReadOnlyDisplay(mode);
        form2.setReadOnlyDisplay(mode);
        dateForm.setReadOnlyDisplay(mode);
    }
    var fSetCanEdit=function(canEdit){
        fUpdateReadOnlyDisplay();
        favoritesForm.setCanEdit(canEdit);
        form1.setCanEdit(canEdit);
        form2.setCanEdit(canEdit);
        dateForm.setCanEdit(canEdit);
    }
    var toggleCanEdit=isc.IButton.create({
        title:"setCanEdit(false)",
        autoFit:true,
        autoDraw:false,
        click:function(){
            if(this.title=="setCanEdit(false)")this.setTitle("setCanEdit(true)");
            else this.setTitle("setCanEdit(false)");
            var canEdit=this.title=="setCanEdit(false)";
            fSetCanEdit(canEdit);
        }
    });
    var readOnlyDisplayPickerForm=isc.DynamicForm.create({
        numCols:2,
        colWidths:[120,140],
        wrapItemTitles:false,
        autoDraw:false,
        fields:[
            {name:"readOnlyDisplayPicker",title:"ReadOnly Display",width:"*",
                valueMap:["static","readOnly","disabled"],
                defaultValue:"disabled",
                changed:function(){
                    fUpdateReadOnlyDisplay(this.getValue());
                }
            }
        ]
    });
    var uiToolstripFI=isc.ToolStrip.create({
        members:[toggleCanEdit,readOnlyDisplayPickerForm]
    });
    var form1=isc.DynamicForm.create({
        width:360,
        showErrorStyle:true,
        autoDraw:false,
        colWidths:[190,200],
        showErrorText:true,errorOrientation:"bottom",
        isGroup:true,
        groupTitle:"Validation Errors",
        fields:[
            {name:"text",title:"Text",type:"text",required:true,width:"*"},
            {name:"colorPicker",title:"Color Picker",type:"color",required:true,width:"*"},
            {name:"textArea",title:"TextArea",type:"textArea",required:true,width:"*"},
            {
                name:"spinner",title:"Spinner",editorType:"SpinnerItem",writeStackedIcons:true,
                width:"*",min:0,max:10,step:0.5,wrapTitle:false,required:true
            },
            {
                name:"unstackedSpinner",title:"Unstacked Spinner",editorType:"SpinnerItem",writeStackedIcons:false,
                width:"*",min:0,max:10,step:0.5,wrapTitle:false,required:true
            },
            {name:"checkbox",title:"Checkbox",type:"checkbox",height:25,required:true,width:"*"},
            {name:"radioGroup",title:"Radio Group",type:"radioGroup",required:true,width:"*",
                valueMap:["Option 1","Option 2"]},
            {name:"validate",title:"Validate",type:"button",click:function(){this.form.validate()}}
        ],
        values:{slider:4}
    });
    form1.validate();
    var valueMap={
        "US":"United States",
        "CH":"China",
        "JA":"Japan",
        "IN":"India",
        "GM":"Germany",
        "FR":"France",
        "IT":"Italy",
        "RS":"Russia",
        "BR":"Brazil",
        "CA":"Canada",
        "MX":"Mexico",
        "SP":"Spain"
    }
    var form2=isc.DynamicForm.create({
        width:500,
        colWidths:[170,"*"],
        autoDraw:false,
        isGroup:true,
        groupTitle:"Select / Combo Controls",
        fields:[{
            name:"bugStatus",title:"Select",hint:"<nobr>A simple comboBox</nobr>",
            editorType:"ComboBoxItem",
            valueMap:{
                "cat":"Cat",
                "dog":"Dog",
                "giraffe":"Giraffe",
                "goat":"Goat",
                "marmoset":"Marmoset",
                "mouse":"Mouse"
            }
        },
        {
            name:"productName",title:"Item Name",hint:"<nobr>A databound comboBox</nobr>",
            editorType:"ComboBoxItem",
            optionDataSource:"Product"
        },
        {
            name:"selectItem2",title:"Select",hint:"<nobr>A select with styled entries</nobr>",
            editorType:"SelectItem",
            valueMap:{
                "red":"<span style='color:#FF0000;'>Red</span>",
                "green":"<span style='color:#00FF00;'>Green</span>",
                "blue":"<span style='color:#0000FF;'>Blue</span>"
            }
        },
        {
            name:"selectItemMultipleGrid",title:"Select Multiple (Grid)",
            editorType:"SelectItem",
            multiple:true,
            multipleAppearance:"grid",
            valueMap:{
                "cat":"Cat",
                "dog":"Dog",
                "giraffe":"Giraffe",
                "goat":"Goat",
                "marmoset":"Marmoset",
                "mouse":"Mouse"
            }
        },
        {
            name:"selectItemMultiplePickList",title:"Select Multiple (PickList)",
            editorType:"SelectItem",
            multiple:true,
            multipleAppearance:"picklist",
            valueMap:{
                "cat":"Cat",
                "dog":"Dog",
                "giraffe":"Giraffe",
                "goat":"Goat",
                "marmoset":"Marmoset",
                "mouse":"Mouse"
            }
        }
        ]
    });
    var dateForm=isc.DynamicForm.create({
        width:500,
        fixedColWidths:true,
        colWidths:[120,"*"],
        isGroup:true,
        autoDraw:false,
        groupTitle:"Date Controls",
        fields:[{
            name:"dateItem",title:"Date",hint:"<nobr>Picklist based date input</nobr>",
            editorType:"DateItem"
        },
        {
            name:"dateItem2",title:"Date",hint:"<nobr>Direct date input</nobr>",
            editorType:"DateItem",
            useTextField:true
        },
        {
            name:"timeItem",title:"Time",
            editorType:"TimeItem"
        },
        {
            name:"timeItem2",title:"Time",hint:"Picklist based time input",
            editorType:"TimeItem",
            useTextField:false
        },
        {
            name:"dri",title:"Date Range",
            width:400,
            editorType:"DateRangeItem",
            allowRelativeDates:true,
            fromDate:"$today",
            toDate:"-1m"
        },
        {
            name:"mdri",title:"Mini Date Range",
            editorType:"MiniDateRangeItem"
        },
        {
            name:"rdi",title:"Relative Date",
            editorType:"RelativeDateItem"
        }
        ]
    });
    var departmentTree=isc.Tree.create({
        modelType:"children",
        root:{
            name:"root",
            children:[{
                id:1000,
                name:"Marketing",
                children:[
                    {id:1001,name:"Advertising"},
                    {id:1002,name:"Community Relations"}
                ]
            },{
                id:2000,
                name:"Sales",
                children:[
                    {id:2001,name:"Channel Sales"},
                    {id:2002,name:"Direct Sales"}
                ]
            },{
                id:3000,
                name:"Manufacturing",
                children:[
                    {id:3001,name:"Design"},
                    {id:3002,name:"Development"},
                    {id:3003,name:"QA"}
                ]
            },{
                id:4000,
                name:"Services",
                children:[
                    {id:4001,name:"Support"},
                    {id:4002,name:"Consulting"}
                ]
            }]
        }
    });
    isc.DataSource.create({
        ID:"clientOnlyUsersDS",
        clientOnly:true,
        fields:[
            {
                name:"id",
                title:"ID",
                type:"integer",
                primaryKey:true,
                hidden:true
            },
            {name:"name",title:"Name"}
        ],
        cacheData:[
            {id:1,name:"Max"},
            {id:2,name:"Bethany"},
            {id:3,name:"Zach"},
            {id:4,name:"Francesca"}
        ]
    });
    isc.DataSource.create({
        ID:"clientOnlyUserFavoritesDS",
        clientOnly:true,
        fields:[{
            name:"id",
            title:"ID",
            type:"integer",
            primaryKey:true,
            hidden:true
        },{
            name:"userID",
            type:"integer",
            foreignKey:"clientOnlyUsersDS.id",
            title:"User ID"
        },{
            name:"favoriteAnimal",
            title:"Favorite Animal"
        },{
            name:"favoriteNumber",
            type:"number",
            title:"Favorite Integer (0 - 100)"
        },{
            name:"hasFavoriteColor",
            title:"Has a Favorite Color?",
            type:"boolean"
        },{
            name:"favoriteColor",
            valueMap:["Red","Green","Blue"]
        },{
            name:"favoriteDate",
            type:"date",
            title:"Favorite Date"
        },{
            name:"favoriteTime",
            type:"time",
            title:"Favorite Time"
        },{
            name:"favoriteMusicGenres",
            multiple:true,
            title:"PickTreeItem",
            valueMap:["Alternative","Classical","Country","Folk","Hip Hop","Jazz","Pop","R&B","Rock","World","Other"]
        },{
            name:"favoriteVacationDestination",
            title:"Favorite Vacation Destination",
            valueMap:{
                "AS":"Australia",
                "BR":"Brazil",
                "CA":"Canada",
                "CH":"China",
                "FR":"France",
                "GM":"Germany",
                "IN":"India",
                "ID":"Indonesia",
                "IT":"Italy",
                "JA":"Japan",
                "MX":"Mexico",
                "RS":"Russia",
                "KS":"South Korea",
                "SP":"Spain",
                "UK":"United Kingdom",
                "US":"United States"
            }
        },{
            name:"favoriteCuisines",
            multiple:true,
            title:"Favorite Cuisines",
            valueMap:{
                "US":"American",
                "AS":"Australian",
                "BR":"Brazilian",
                "UK":"British",
                "CA":"Canadian",
                "CH":"Chinese",
                "FR":"French",
                "GM":"German",
                "IN":"Indian",
                "ID":"Indonesian",
                "IT":"Italian",
                "JA":"Japanese",
                "KS":"Korean",
                "MX":"Mexican",
                "RS":"Russian",
                "SP":"Spanish"
            }
        },{
            name:"favoriteDepartment",
            title:"Favorite Department"
        }],
        cacheData:[
            {
                id:1,
                userID:1,
                favoriteAnimal:"Lemur",
                favoriteNumber:90,
                spinner:1,
                unstackedSpinner:1,
                hasFavoriteColor:false,
                favoriteDate:isc.Date.createLogicalDate(2000,0,1),
                favoriteTime:isc.Date.createLogicalTime(0,0),
                favoriteMusicGenres:["Folk"],
                favoriteVacationDestination:"JA",
                favoriteCuisines:["IN","RS"],
                favoriteDepartment:4002
            },
            {
                id:2,
                userID:2,
                favoriteAnimal:"Zebra",
                favoriteNumber:12,
                spinner:2,
                unstackedSpinner:2,
                hasFavoriteColor:true,
                favoriteColor:"Orange",
                favoriteDate:isc.Date.createLogicalDate(2012,11,12),
                favoriteTime:isc.Date.createLogicalTime(12,12),
                favoriteMusicGenres:["Alternative","Hip Hop"],
                favoriteVacationDestination:"US",
                favoriteCuisines:["US","UK"],
                favoriteDepartment:3002
            },
            {
                id:3,
                userID:3,
                favoriteAnimal:"Elephant",
                favoriteNumber:10,
                spinner:3,
                unstackedSpinner:3,
                hasFavoriteColor:true,
                favoriteColor:"Green",
                favoriteDate:isc.Date.createLogicalDate(2010,9,10),
                favoriteTime:isc.Date.createLogicalTime(10,10),
                favoriteMusicGenres:["Country","Folk"],
                favoriteVacationDestination:"MX",
                favoriteCuisines:["GM","MX"],
                favoriteDepartment:1001
            },
            {
                id:4,
                userID:4,
                favoriteAnimal:"Blue Whale",
                favoriteNumber:55,
                spinner:4,
                unstackedSpinner:4,
                hasFavoriteColor:true,
                favoriteColor:"Blue",
                favoriteDate:isc.Date.createLogicalDate(2005,4,5),
                favoriteTime:isc.Date.createLogicalTime(12,0),
                favoriteMusicGenres:["Pop","R&B","Other"],
                favoriteVacationDestination:"SP",
                favoriteCuisines:["FR","IT","KS","SP"],
                favoriteDepartment:3001
            }
        ]
    });
    var favoritesForm=isc.DynamicForm.create({
        ID:"favoritesForm",
        autoDraw:false,
        autoFetchData:true,
        isGroup:true,
        groupTitle:"Pending Values",
        initialCriteria:{userID:1},
        width:500,
        numCols:3,
        colWidths:[175,200,10],
        dataSource:isc.DS.get("clientOnlyUserFavoritesDS"),
        revertValueKey:"Escape",
        items:[{
            name:"userID",
            title:"User",
            editorType:"SelectItem",
            optionDataSource:isc.DS.get("clientOnlyUsersDS"),
            valueField:"id",
            displayField:"name",
            width:"*",
            changed:function(form,item,value){
                form.fetchData({userID:value},function(dsResponse,data,dsRequest){
                    var hasFavoriteColor=(data!=null&&data.length>=1&&
                                             !!data[0].hasFavoriteColor)
                    form.getItem("favoriteColor").setDisabled(!hasFavoriteColor);
                });
            }
        },{
            name:"favoriteAnimal",
            width:"*",
            showPending:true
        },{
            name:"favoriteAnimal2",editorType:"TextAreaItem",height:40,
            width:"*",
            showPending:true
        },{
            name:"favoriteNumber",
            editorType:"SliderItem",
            width:"*",
            minValue:0,
            maxValue:100,
            showPending:true
        },{
            name:"spinner",title:"Spinner",editorType:"SpinnerItem",writeStackedIcons:true,
            width:"*",
            min:0,max:10,step:0.5,wrapTitle:false,showPending:true
        },{
            name:"unstackedSpinner",title:"Unstacked Spinner",editorType:"SpinnerItem",writeStackedIcons:false,
            width:"*",
            min:0,max:10,step:0.5,wrapTitle:false,showPending:true
        },{
            name:"hasFavoriteColor",
            editorType:"CheckboxItem",
            width:"*",
            showPending:true,
            changed:function(form,item,value){
                form.getItem("favoriteColor").setDisabled(!value);
            }
        },{
            name:"favoriteColor",
            editorType:"RadioGroupItem",
            disabled:true,
            width:"*",
            showPending:true
        },{
            name:"favoriteDate",
            editorType:"DateItem",
            width:"*",
            showPending:true
        },{
            name:"favoriteTime",
            editorType:"TimeItem",
            width:"*",
            showPending:true
        },{
            name:"favoriteMusicGenres",
            title:"MultiComboBoxItem",
            editorType:"MultiComboBoxItem",
            useInsertionOrder:false,
            width:"*",colSpan:"*",
            showPending:true
        },{
            name:"favoriteVacationDestination",
            wrapTitle:false,
            editorType:"SelectItem",
            width:"*",
            showPending:true
        },{
            name:"favoriteCuisines",
            editorType:"SelectItem",
            width:"*",colSpan:"*",
            showPending:true,
            showOldValueInHover:true
        },{
            name:"favoriteDepartment",
            editorType:"PickTreeItem",
            title:"PickTreeItem",
            width:"*",
            displayField:"name",
            valueField:"id",
            valueTree:departmentTree,
            showPending:true
        }]
    });
    var supplyItemDetailViewer=isc.DetailViewer.create({
        autoDraw:false,
        width:300,
        fields:[
            {name:"header",type:"header",value:"DetailViewer Header"},
            {name:"field1",title:"First Field"},
            {name:"field2",title:"Another Field"}
        ],
        data:[{
            header:"DetailViewer Header",
            field1:"Value of the first field",
            field2:"Another value, with some longer text"
        }]
    });
    favoritesForm.fetchData({userId:1},function(dsResponse,data){
        favoritesForm.setValue("favoriteAnimal","Changed value");
        favoritesForm.setValue("favoriteAnimal2","Changed value");
        favoritesForm.setValue("favoriteNumber",73);
        favoritesForm.setValue("spinner",5);
        favoritesForm.setValue("unstackedSpinner",5);
        favoritesForm.setValue("favoriteDate",isc.Date.createLogicalDate(2012,11,12));
        favoritesForm.setValue("favoriteTime",isc.Date.createLogicalTime(12,12));
        favoritesForm.setValue("favoriteMusicGenres",["Country","Folk"]);
        favoritesForm.setValue("favoriteVacationDestination","US");
        favoritesForm.setValue("favoriteCuisines",["US","UK"]);
        favoritesForm.setValue("favoriteDepartment",3002);
        favoritesForm.setValue("hasFavoriteColor",true);
        favoritesForm.setValue("favoriteColor","Red");
        favoritesForm.getItem("favoriteColor").setDisabled(false);
    });
    var formFlowLayout=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[favoritesForm,form1,form2,dateForm,supplyItemDetailViewer]
    });
    var formItemsPane=isc.VLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        members:[uiToolstripFI,formFlowLayout]
    });
    isc.SkinUtil.testPanes[paneName]=formItemsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getGridsPane=function(){
    var paneName="colorTester_gridsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var gridWidth=300;
    var lgFilter=isc.ListGrid.create({
        width:gridWidth,height:200,
        dataSource:isc.DS.get("Employee"),
        canEdit:true,
        fields:[
            {name:"firstName",title:"First Name"},
            {name:"lastName",title:"Last Name"},
            {name:"email",title:"Email"}
        ],
        autoFetchData:true,
        showFilterEditor:true,
        initialCriteria:{fieldName:"firstName",operator:"iNotContains",value:"x"},
        initialSort:{property:"firstName",direction:"ascending"},
        selectionAppearance:"checkbox",
        dataArrived:function(){
            if(!this.__skipSelect){
                this.__skipSelect=true;
                this.selectRecord(this.data.get(1));
            }
        }
    })
    var lgHeaderSpans=isc.ListGrid.create({
        width:gridWidth,height:200,
        headerHeight:52,
        dataSource:isc.DS.get("Payment"),
        autoFetchData:true,
        dataFetchMode:"local",
        canEdit:true,
        initialSort:{property:"customerName",direction:"ascending"},
        showGridSummary:true,
        fields:[
            {name:"customerNumber"},
            {name:"customerName"},
            {name:"paymentDate"},
            {name:"amount",
                summaryFunction:"sum",
                showGridSummary:true
            }
        ],
        headerSpans:[
            {
                fields:["customerNumber","customerName"],
                title:"Customer"
            },
            {
                fields:["paymentDate","amount"],
                title:"Payment"
            }
        ],
        dataArrived:function(){
            if(!this.__skipSelect){
                this.__skipSelect=true;
                this.selectRecord(this.data.get(1));
            }
        }
    });
    var lgExpandingRows=isc.ListGrid.create({
        width:gridWidth,height:200,
        alternateRecordStyles:true,
        dataSource:isc.DS.get("Order"),
        fields:[
            {name:"orderNumber"},
            {name:"orderDate"},
            {name:"status"}
        ],
        initialSort:[{property:"orderDate",direction:"ascending"}],
        expansionFieldImageShowSelected:false,
        autoFetchData:true,
        canExpandRecords:true,
        expansionMode:"related",
        detailDS:"OrderDetail",
        expansionRelatedProperties:{
            border:"1px solid inherit",
            margin:5,
            autoFitMaxRecords:3,
            fields:[
                {name:"productName"},
                {name:"quantityOrdered"},
                {name:"priceEach"}
            ],
            initialSort:[{property:"productName",direction:"ascending"}],
            dataArrived:function(){
                if(!this.__skipSelect){
                    this.__skipSelect=true;
                    this.selectRecord(this.data.get(1));
                }
            }
        },
        dataArrived:function(){
            if(!this.__skipSelect){
                this.__skipSelect=true;
                this._allowGroup=true;
                this.selectRecord(this.data.get(1));
                this.expandRecord(this.data.get(1));
            }
        }
    });
    var lgGrouped=isc.ListGrid.create({
        width:gridWidth,height:200,
        dataSource:isc.DS.get("Order"),
        fields:[
            {name:"requiredDate"},
            {name:"orderNumber",title:"Orders",
                summaryFunction:"count",
                showGroupSummary:true
            }
        ],
        canEdit:true,
        groupStartOpen:"all",
        groupByField:'status',
        autoFetchData:true,
        initialSort:{property:"requiredDate",direction:"descending"},
        showGroupSummary:true,
        dataArrived:function(){
            if(!this.__skipSelect){
                this.__skipSelect=true;
                this._allowGroup=true;
                this.selectRecord(this.data.get(1));
            }
        },
        groupTreeChanged:function(){
            if(this._allowGroup){
                this._allowGroup=false;
                this.selectRecord(1);
            }
        }
    });
    var lgGroupedHeaderSummaries=isc.ListGrid.create({
        width:gridWidth,height:200,
        dataSource:isc.DS.get("Payment"),
        fields:[
            {name:"customerName"},
            {name:"amount",
                summaryFunction:"sum",
                showGroupSummary:true
            }
        ],
        canEdit:true,
        groupStartOpen:"all",
        groupByField:'paymentDate',
        autoFetchData:true,
        initialSort:{property:"amount",direction:"descending"},
        showGroupSummary:true,
        showGroupSummaryInHeader:true,
        dataArrived:function(){
            if(!this.__skipSelect){
                this.__skipSelect=true;
                this._allowGroup=true;
                this.selectRecord(this.data.get(1));
            }
        },
        groupTreeChanged:function(){
            if(this._allowGroup){
                this._allowGroup=false;
                this.selectRecord(1);
            }
        }
    });
    var tgMultiColumn=isc.TreeGrid.create({
        width:gridWidth,
        height:200,
        dataSource:isc.DS.get("Employee"),
        autoFetchData:true,
        nodeIcon:"[SKIN]../headerIcons/person.png",
        folderIcon:"[SKIN]../headerIcons/person.png",
        showOpenIcons:false,
        showDropIcons:false,
        closedIconSuffix:"",
        showSelectedIcons:false,
        dataProperties:{
            idField:"employeeNumber",
            parentIdField:"reportsTo",
            autoOpenRoot:true
        },
        fields:[
            {name:"firstName"},
            {name:"lastName"},
            {name:"jobTitle"}
        ],
        dataArrived:function(){
            if(!this.__skinOpenNode){
                this.__skinOpenNode=true;
                this._allowSelect=true;
                this.openFolder(this.data.root.children[0]);
            }else if(this._allowSelect){
                this._allowSelect=false;
                this.selectRecord(this.data.root.children[0].children[0]);
            }
        }
    });
    var gridsPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[lgFilter,lgHeaderSpans,lgExpandingRows,lgGrouped,lgGroupedHeaderSummaries,tgMultiColumn]
    });
    isc.SkinUtil.testPanes[paneName]=gridsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getTabsPane=function(){
    var paneName="colorTester_tabsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var pawnImage48="[TOOLS]skinTools/images/pawn_blue.png";
    this.getHeaderIcon=function(name){
        var imageRecord=isc.ImagePicker.getStockIcon(name,"name","headerIcons");
        if(imageRecord){
            return imageRecord.src;
        }
    }
    this.getTabs=function(showTitles,vertical){
        var tabs=[
            {title:showTitles?"Selected":null,icon:this.getHeaderIcon("Person"),iconSize:12,
             pane:isc.Img.create({autoDraw:true,width:48,height:48,src:pawnImage48})},
            {title:showTitles?"Closeable":null,icon:this.getHeaderIcon("Person"),iconSize:12,canClose:true,
             pane:isc.Img.create({autoDraw:true,width:48,height:48,src:pawnImage48})},
            {title:showTitles?"Disabled":null,icon:this.getHeaderIcon("Person"),iconSize:12,disabled:true,showDisabledIcon:false,
             pane:isc.Img.create({autoDraw:true,width:48,height:48,src:pawnImage48})}
        ];
        return tabs;
    }
    var tabSetTop=isc.TabSet.create({
        tabBarPosition:"top",
        width:370,
        height:100,
        titleEditEvent:"doubleClick",
        tabs:this.getTabs(true)
    });
    var tabSetBottom=isc.TabSet.create({
        tabBarPosition:"bottom",
        width:370,
        height:100,
        titleEditEvent:"doubleClick",
        tabs:this.getTabs(true)
    });
    var tabSetLeft=isc.TabSet.create({
        tabBarPosition:"left",
        width:120,
        height:220,
        defaultTabHeight:24,
        tabs:this.getTabs(false,true)
    });
    var tabSetRight=isc.TabSet.create({
        tabBarPosition:"right",
        width:120,
        height:220,
        showTabTitle:false,
        defaultTabHeight:24,
        tabs:this.getTabs(false,true)
    });
    var hTabLayout=isc.VLayout.create({
        membersMargin:20,
        width:1,height:1,
        autoDraw:false,
        members:[tabSetTop,tabSetBottom]
    });
    var tabsPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[hTabLayout,tabSetLeft,tabSetRight]
    });
    isc.SkinUtil.testPanes[paneName]=tabsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getWidgetsPane=function(){
    var paneName="colorTester_widgetsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var lgTest1=isc.ListGrid.create({
        fields:[
            {type:"text",title:"System",name:"system"},
            {type:"text",title:"Monitor Name",name:"monitor"}
        ],
        canEdit:true,editEvent:"click",
        autoDraw:false
    })
    var statusReport=isc.HTMLFlow.create({
        ID:"statusReport",
        padding:5,border:"1px solid #808080",
        autoDraw:false,
        setNewStatus:function(system){
            this.setContents(system+
                ": <span style='color:green;font-weight:bold'>Normal</span><br>");
        }
    });
    var addButton=isc.ImgButton.create({
        autoDraw:false,
        src:"[SKIN]actions/add.png",size:16,
        showFocused:false,showRollOver:false,showDown:false,
        click:"lgTest1.startEditingNew();return false;"
    });
    var removeButton=isc.ImgButton.create({
        autoDraw:false,
        src:"[SKIN]actions/remove.png",size:16,
        showFocused:false,showRollOver:false,showDown:false,
        click:"lgTest1.removeSelectedData();return false;"
    });
    var systemSelector=isc.DynamicForm.create({
        height:1,
        width:75,numCols:1,
        autoDraw:false,
        fields:[
            {name:"system",type:"select",width:150,showTitle:false,
             valueMap:["Development","Staging","Production"],
             defaultValue:"Development",
             change:"statusReport.setNewStatus(value)",
             click:"return false;"
            }
        ]
    });
    var sectionStack1=isc.SectionStack.create({
        sections:[
            {items:lgTest1,title:"Monitors",controls:[addButton,removeButton],expanded:true},
            {items:statusReport,title:"Status",controls:systemSelector,expanded:true}
        ],
        visibilityMode:"multiple",
        animateSections:true,
        height:300,
        width:300,
        autoDraw:false,
        overflow:"hidden"
    })
    statusReport.setNewStatus(systemSelector.getValue("system"));
    var colorPicker=isc.ColorPicker.create({
        autoDraw:false,
        isModal:false,
        autoDismiss:false
    });
    var dateChooserNormal=isc.DateChooser.create({
        autoDraw:false
    });
    var dateChooserFiscal=isc.DateChooser.create({
        autoDraw:false,
        showWeekChooser:true,
        showFiscalYearChooser:true
    });
    var menuTest=isc.Menu.create({
        autoDraw:true,
        autoDismiss:false,
        autoDismissOnBlur:false,
        data:[
            {title:"New",keyTitle:"Ctrl+N",icon:"[SKINIMG]actions/add.png"},
            {title:"Open",keyTitle:"Ctrl+O",icon:"[SKINIMG]actions/view.png"},
            {isSeparator:true},
            {title:"Save",keyTitle:"Ctrl+S",icon:"[SKINIMG]actions/save.png"},
            {title:"Search",icon:"[SKINIMG]actions/search.png"},
            {isSeparator:true},
            {title:"Recent Documents",icon:"[SKINIMG]actions/dynamic.png",submenu:[
                {title:"data.xml",checked:true},
                {title:"Component Guide.doc"},
                {title:"SmartClient.doc",checked:true},
                {title:"AJAX.doc"}
            ]},
            {isSeparator:true},
            {title:"Print",enabled:false,keyTitle:"Ctrl+P",icon:"[SKINIMG]actions/print.png"}
        ]
    });
    menuTest.show();
    var rteNormal=isc.RichTextEditor.create({
        autoDraw:false,
        height:200
    });
    var widgetsPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[sectionStack1,dateChooserNormal,dateChooserFiscal,menuTest,
            colorPicker,rteNormal
        ]
    });
    isc.SkinUtil.testPanes[paneName]=widgetsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getWindowsPane=function(){
    var paneName="colorTester_windowsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    isc.defineClass("HelpCanvas","Canvas").addProperties({
        autoDraw:false,
        defaultWidth:300,
        padding:10,
        contents:"<b>Severity 1</b> - Critical problem<br>System is unavailable in production or "+
                  "is corrupting data, and the error severely impacts the user's operations."+
                  "<br><br><b>Severity 2</b> - Major problem<br>An important function of the system "+
                  "is not available in production, and the user's operations are restricted."+
                  "<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the "+
                  "system occurs, but it does not seriously affect the user's operations."
    });
    var winNormal=isc.Window.create({
        title:"Auto-sizing window",
        autoDraw:false,
        autoSize:true,
        canDragReposition:true,
        canDragResize:true,
        items:[
            isc.HelpCanvas.create()
        ]
    });
    var winScrollbar=isc.Window.create({
        width:200,
        height:240,
        title:"Normal window",
        canDragReposition:true,
        canDragResize:true,
        autoDraw:false,
        items:[
            isc.HelpCanvas.create()
        ]
    });
    var winFooter=isc.Window.create({
        title:"Window with footer",
        width:300,height:240,
        canDragResize:true,
        showFooter:true,
        autoDraw:false,
        items:[
            isc.Label.create({
                contents:"Click me",
                align:"center",
                padding:5,
                height:"100%",
                click:function(){
                    winFooter.setStatus("Click at: "+isc.EventHandler.getX()+", "+isc.EventHandler.getY());
                }
            })
        ]
    });
    var multiSort=isc.MultiSortDialog.create({
        height:240,
        autoDraw:false,
        isModal:false,
        fields:isc.getValues(isc.DS.get("Customer").getFields()),
        initialSort:[{property:"customerName",direction:"ascending"}]
    });
    var multiGroup=isc.MultiGroupDialog.create({
        height:240,
        isModal:false,
        autoDraw:false,
        fields:isc.getValues(isc.DS.get("Customer").getFields())
    });
    var windowsPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[winNormal,winScrollbar,winFooter,multiSort,multiGroup]
    });
    isc.SkinUtil.testPanes[paneName]=windowsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getCalendarsPane=function(){
    var paneName="colorTester_calendarsPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var _today=new Date;
    var _start=_today.getDate()-_today.getDay();
    var _month=_today.getMonth();
    var _year=_today.getFullYear();
    var eventData=[
        {
            eventId:1,
            name:"Meeting",
            description:"Shareholders meeting: monthly forecast report",
            startDate:new Date(_year,_month,_start+2,9),
            endDate:new Date(_year,_month,_start+2,14)
        },
        {
            eventId:2,
            name:"Realtor",
            description:"This canvas is styled by color settings on the CalendarEvent",
            startDate:new Date(_year,_month,_start+3,8),
            endDate:new Date(_year,_month,_start+3,10),
            headerTextColor:"black",
            headerBackgroundColor:"orange",
            headerBorderColor:"darkorange",
            textColor:"darkgreen",
            borderColor:"darkorange",
            backgroundColor:"#ffffcc"
        },
        {
            eventId:3,
            name:"Soccer",
            description:"Little league soccer finals",
            startDate:new Date(_year,_month,_start+4,13),
            endDate:new Date(_year,_month,_start+4,16)
        },
        {
            eventId:4,
            name:"Sleep",
            description:"Catch up on sleep",
            startDate:new Date(_year,_month,_start+4,5),
            endDate:new Date(_year,_month,_start+4,9)
        },
        {
            eventId:5,
            name:"Inspection",
            description:"This canvas is styled and disabled by custom styleName and canEdit settings on the CalendarEvent",
            startDate:new Date(_year,_month,_start+4,10),
            endDate:new Date(_year,_month,_start+4,12),
            styleName:"testStyle",
            canEdit:false
        },
        {
            eventId:6,
            name:"Airport run",
            description:"This canvas is styled by color settings on the CalendarEvent",
            startDate:new Date(_year,_month,_start+4,1),
            endDate:new Date(_year,_month,_start+4,3),
            headerTextColor:"white",
            headerBackgroundColor:"green",
            headerBorderColor:"green",
            textColor:"darkgreen",
            borderColor:"darkgreen",
            backgroundColor:"lightgreen"
        },
        {
            eventId:7,
            name:"Dinner Party",
            description:"Prepare elaborate meal for friends",
            startDate:new Date(_year,_month,_start+4,17),
            endDate:new Date(_year,_month,_start+4,20)
        },
        {
            eventId:8,
            name:"Poker",
            description:"Poker at Steve's house",
            startDate:new Date(_year,_month,_start+4,21),
            endDate:new Date(_year,_month,_start+4,23)
        },
        {
            eventId:9,
            name:"Meeting",
            description:"Board of directors meeting: discussion of next months strategy",
            startDate:new Date(_year,_month,_start+5,11),
            endDate:new Date(_year,_month,_start+5,15)
        }
    ];
    isc.DataSource.create({
        ID:"eventDS",
        fields:[
            {name:"eventId",primaryKey:true,type:"sequence"},
            {name:"name"},
            {name:"description"},
            {name:"startDate",type:"datetime"},
            {name:"endDate",type:"datetime"}
        ],
        clientOnly:true,
        testData:eventData
    });
    var _today=new Date();
    var y=_today.getFullYear();
    var m=_today.getMonth();
    var d=_today.getDate();
    var dayLaneData=[
    {
        eventId:1,
        startDate:new Date(y,m,d,8,0),
        endDate:new Date(y,m,d,12,0),
        name:"Development Meeting",
        description:"This canvas is styled and disabled by custom styleName and canEdit settings on the CalendarEvent",
        lane:"charlesMadigen",
        styleName:"testStyle",
        canEdit:false
    },
    {
        eventId:2,
        startDate:new Date(y,m,d,14,0),
        endDate:new Date(y,m,d,18,0),
        name:"Mgmt Meeting",
        description:"Management Meeting",
        lane:"charlesMadigen"
    },
    {
        eventId:3,
        startDate:new Date(y,m,d,4,0),
        endDate:new Date(y,m,d,12,0),
        name:"Data Cleansing",
        description:"This canvas is styled by color settings on the CalendarEvent",
        lane:"tamaraKane",
        headerTextColor:"black",
        headerBackgroundColor:"orange",
        headerBorderColor:"darkorange",
        textColor:"darkgreen",
        borderColor:"darkorange",
        backgroundColor:"#ffffcc"
    },
    {
        eventId:4,
        startDate:new Date(y,m,d,7,30),
        endDate:new Date(y,m,d,12,0),
        name:"Data Migration",
        description:"Data Migration",
        lane:"tamaraKane"
    },
    {
        eventId:5,
        startDate:new Date(y,m,d,13,0),
        endDate:new Date(y,m,d,16,0),
        name:"Documentation",
        description:"Product documentation",
        lane:"tamaraKane"
    },
    {
        eventId:6,
        startDate:new Date(y,m,d,8,0),
        endDate:new Date(y,m,d,20,0),
        name:"Support",
        description:"Telephone Support",
        lane:"darcyFeeney"},
    {
        eventId:7,
        startDate:new Date(y,m,d,11,0),
        endDate:new Date(y,m,d,11,30),
        name:"Break",
        description:"Morning break",
        lane:"darcyFeeney"
    },
    {
        eventId:8,
        startDate:new Date(y,m,d,16,0),
        endDate:new Date(y,m,d,16,30),
        name:"Break",
        description:"Afternoon break",
        lane:"darcyFeeney"
    },
    {
        eventId:9,
        startDate:new Date(y,m,d,0,0),
        endDate:new Date(y,m,d,8,0),
        name:"Premium Support",
        description:"This canvas is styled by color settings on the CalendarEvent",
        lane:"kaiKong",
        headerTextColor:"white",
        headerBackgroundColor:"green",
        headerBorderColor:"green",
        textColor:"darkgreen",
        borderColor:"darkgreen",
        backgroundColor:"lightgreen"
    },
    {
        eventId:10,
        startDate:new Date(y,m,d,20,0),
        endDate:new Date(y,m,d,23,59),
        name:"Support",
        description:"Premium Support (overnight response)",
        lane:"kaiKong"
    },
    {
        eventId:11,
        startDate:new Date(y,m,d,8,0),
        endDate:new Date(y,m,d,12,0),
        name:"Development Meeting",
        description:"Development Meeting",
        lane:"shellyFewel"
    },
    {
        eventId:12,
        startDate:new Date(y,m,d,13,30),
        endDate:new Date(y,m,d,17,30),
        name:"Team Meeting",
        description:"Developer Team Meeting",
        lane:"shellyFewel"
    }
    ];
    var calDay=isc.Calendar.create({
        width:400,height:300,
        autoDraw:false,
        dataSource:isc.DS.get("eventDS"),
        autoFetchData:true,
        showWeekView:false,
        showMonthView:false
    });
    var calWeek=isc.Calendar.create({
        width:400,height:300,
        autoDraw:false,
        dataSource:isc.DS.get("eventDS"),
        autoFetchData:true,
        showDayView:false,
        showMonthView:false
    });
    var calMonth=isc.Calendar.create({
        width:400,height:300,
        autoDraw:false,
        dataSource:isc.DS.get("eventDS"),
        autoFetchData:true,
        showDayView:false,
        showWeekView:false
    });
    var lanes=[
        {name:"charlesMadigen",title:"Charles Madigen"},
        {name:"tamaraKane",title:"Tamara Kane"},
        {name:"darcyFeeney",title:"Darcy Feeney"},
        {name:"kaiKong",title:"Kai Kong"},
        {name:"shellyFewel",title:"Shelly Fewel"}
    ];
    var calDayLanes=isc.Calendar.create({
        width:400,height:300,
        autoDraw:false,
        data:dayLaneData,
        lanes:lanes,
        showWeekView:false,
        showMonthView:false,
        showTimelineView:false,
        chosenDate:new Date(),
        showDayLanes:true,
        canEditLane:true
    });
    var calCompact=isc.Calendar.create({
        width:400,
        height:300,
        autoDraw:false,
        showDayView:false,
        showWeekView:false,
        showOtherDays:false,
        showDayHeaders:false,
        showDateChooser:false,
        showDatePickerButton:false,
        showAddEventButton:false,
        disableWeekends:false,
        dataSource:isc.DS.get("eventDS"),
        autoFetchData:true,
        canCreateEvents:false,
        getDayBodyHTML:function(date,events,calendar,rowNum,colNum){
            var returnStr=date.getDate()+" ";
            if(events&&events.length>0){
                returnStr+=this.imgHTML("icons/16/approved.png",16,16,"image");
            }
            return returnStr;
        },
        dayBodyClick:function(date,events,calendar,rowNum,colNum){
            var nameStr="";
            if(events.length==0)nameStr="No events";
            for(var i=0;i<events.length;i++){
                nameStr+=events[i].name+"<BR/>";
            }
            isc.say(nameStr,{title:date.toUSShortDate()});
        }
    });
    var calWorkDay=isc.Calendar.create({
        width:400,height:300,
        autoDraw:false,
        dataSource:isc.DS.get("eventDS"),
        autoFetchData:true,
        showDayView:false,
        showMonthView:false,
        showWeekends:false,
        showWorkday:true,
        scrollToWorkday:true
    });
    var calStackedEvents=isc.Calendar.create({
        width:400,height:300,
        autoDraw:false,
        dataSource:isc.DS.get("eventDS"),
        autoFetchData:true,
        showMonthView:false,
        showColumnLayouts:true
    });
    var calendarsPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[calDay,calWeek,calMonth,calDayLanes,calWorkDay,calCompact,calStackedEvents]
    });
    isc.SkinUtil.testPanes[paneName]=calendarsPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc.getTimelinesPane=function(){
    var paneName="colorTester_timelinesPane";
    if(isc.SkinUtil.testPanes[paneName]!=null){
        return isc.SkinUtil.testPanes[paneName];
    }
    var testData=[
        {
            endDate:"2016-07-09T23:59:59.000",
            name:"Add new Timeline view",
            description:"Add a new calendar Timeline component",
            taskId:1,
            startDate:"2016-07-03T00:00:00.000",
            lane:"darcyFeeney"
        },
        {
            endDate:"2016-07-07T23:59:59.000",
            name:"PDF Import/Export",
            description:"Implement native PDF import/export",
            taskId:3,
            startDate:"2016-07-02T00:00:00.000",
            lane:"garretMonroe"
        },
        {
            endDate:"2016-07-05T23:59:59.000",
            name:"Calculated Fields",
            description:"Formula and Summary fields for ListGrid",
            taskId:4,
            startDate:"2016-07-01T00:00:00.000",
            lane:"charlesMadigen"
        },
        {
            endDate:"2016-07-15T23:59:59.000",
            name:"ListGrid cell-level selection",
            description:"Implement spreadsheet-like selection in ListGrid",
            taskId:5,
            startDate:"2016-07-08T00:00:00.000",
            lane:"charlesMadigen"
        },
        {
            endDate:"2016-07-21T23:59:59.000",
            name:"Text import",
            description:"Server text-import",
            taskId:6,
            startDate:"2016-07-17T00:00:00.000",
            lane:"charlesMadigen"
        },
        {
            endDate:"2016-07-12T23:59:59.000",
            name:"TabIndex enhancements",
            description:"Enhance formItem tabindex handling",
            taskId:7,
            startDate:"2016-07-10T00:00:00.000",
            lane:"kaiKong"
        },
        {
            endDate:"2016-07-04T23:59:59.000",
            name:"Visual Builder skin",
            description:"Skinning changes",
            taskId:8,
            startDate:"2016-07-01T00:00:00.000",
            lane:"shellyFewel"
        },
        {
            endDate:"2016-07-03T23:59:59.000",
            name:"DataSource Transaction-handling",
            description:"New transaction features",
            taskId:9,
            startDate:"2016-07-01T00:00:00.000",
            lane:"tamaraKane"
        },
        {
            endDate:"2016-07-21T23:59:59.000",
            name:"New Samples",
            description:"Add 20 samples for the following new features: ...",
            taskId:10,
            startDate:"2016-07-05T00:00:00.000",
            lane:"tamaraKane"
        },
        {
            endDate:"2016-07-15T23:59:59.000",
            name:"Localization",
            description:"Extend i18n support",
            taskId:11,
            startDate:"2016-07-10T00:00:00.000",
            lane:"darcyFeeney"
        },
        {
            endDate:"2016-07-19T23:59:59.000",
            name:"New Language Packs",
            description:"Add these 4 new language packs: ...",
            taskId:12,
            startDate:"2016-07-17T00:00:00.000",
            lane:"darcyFeeney"
        },
        {
            endDate:"2016-07-12T23:59:59.000",
            name:"ComponentXML",
            description:"Add the following features and update documentation: ...",
            taskId:13,
            startDate:"2016-07-06T00:00:00.000",
            lane:"shellyFewel"
        },
        {
            endDate:"2016-07-20T23:59:59.000",
            name:"TileGrid",
            description:"Change styling on builtin tiles as follows: ...",
            taskId:14,
            startDate:"2016-07-15T00:00:00.000",
            lane:"shellyFewel"
        },
        {
            endDate:"2016-07-09T23:59:59.000",
            canEdit:false,
            name:"Dev Meeting",
            description:"Weekly dev meeting",
            eventWindowStyle:"testStyle",
            taskId:16,
            startDate:"2016-07-09T00:00:00.000",
            lane:"charlesMadigen"
        },
        {
            endDate:"2016-07-16T23:59:59.000",
            canEdit:false,
            name:"Dev Meeting",
            description:"Weekly dev meeting",
            eventWindowStyle:"testStyle",
            taskId:17,
            startDate:"2016-07-16T00:00:00.000",
            lane:"charlesMadigen"
        },
        {
            endDate:"2016-07-10T23:59:59.000",
            name:"Oracle enhancements",
            description:"Add the following 11g-specific enhancements: ...",
            taskId:18,
            startDate:"2016-07-08T00:00:00.000",
            lane:"garretMonroe"
        },
        {
            endDate:"2016-07-15T23:59:59.000",
            name:"Client export",
            description:"Excel export alterations",
            taskId:19,
            startDate:"2016-07-12T00:00:00.000",
            lane:"garretMonroe"
        },
        {
            endDate:"2016-07-21T23:59:59.000",
            name:"Record Components",
            description:"New ListGrid recordComponent modes: ...",
            taskId:20,
            startDate:"2016-07-17T00:00:00.000",
            lane:"garretMonroe"
        },
        {
            endDate:"2016-07-05T23:59:59.000",
            name:"SQLDataSource",
            description:"Enhancements to customSQL support",
            taskId:21,
            startDate:"2016-07-03T00:00:00.000",
            lane:"kaiKong"
        },
        {
            endDate:"2016-07-09T23:59:59.000",
            name:"includeFrom",
            description:"Update support via includeFrom",
            taskId:22,
            startDate:"2016-07-07T00:00:00.000",
            lane:"kaiKong"
        },
        {
            endDate:"2016-07-17T23:59:59.000",
            name:"FileItem",
            description:"Add milti-file upload support",
            taskId:23,
            startDate:"2016-07-15T00:00:00.000",
            lane:"kaiKong"
        },
        {
            endDate:"2016-07-20T23:59:59.000",
            name:"Doc viewer",
            description:"Enhance documentation viewer with these additional syntax-hilites: ...",
            taskId:24,
            startDate:"2016-07-19T00:00:00.000",
            lane:"kaiKong"
        }
    ];
    testData.map(function(row){
        row.startDate=new this.Date(row.startDate);
        row.endDate=new this.Date(row.endDate);
    });
    isc.DataSource.create({
        ID:"tasks",
        clientOnly:true,
        allowAdvancedCriteria:true,
        fields:[
            {name:"taskId",hidden:true,type:"sequence",primaryKey:true},
            {name:"name",title:"Name",type:"text",required:true},
            {name:"description",title:"Description",type:"text"},
            {name:"startDate",title:"Start Date",type:"datetime",required:true},
            {name:"endDate",title:"End Date",type:"datetime",required:true},
            {name:"lane",title:"Lane",type:"text",required:true},
            {name:"eventWindowStyle",type:"text"},
            {name:"canEdit",hidden:true,type:"boolean"}
        ],
        testData:testData
    });
    var developers=[
        {name:"charlesMadigen",title:"Charles Madigen",devGroup:"Managers"},
        {name:"tamaraKane",title:"Tamara Kane",devGroup:"Developers"},
        {name:"darcyFeeney",title:"Darcy Feeney",devGroup:"Managers"},
        {name:"kaiKong",title:"Kai Kong",devGroup:"Developers"},
        {name:"shellyFewel",title:"Shelly Fewel",devGroup:"Managers"},
        {name:"garretMonroe",title:"Garret Monroe",devGroup:"Developers"}
    ];
    var _calStart=isc.DateUtil.getStartOf(new Date(2016,6,5),"W");
    var _calEnd=_calStart.duplicate();
    _calEnd.setDate(_calEnd.getDate()+20);
    var timeline1=isc.Timeline.create({
        height:451,
        width:500,
        autoDraw:false,
        startDate:_calStart,
        endDate:_calEnd,
        dataSource:isc.DS.get("tasks"),
        autoFetchData:true,
        lanes:developers,
        headerLevels:[{unit:"week"},{unit:"day"}],
        laneFields:[{name:"title",title:"Developer",minWidth:120,autoFitWidth:true}],
        canEditLane:true,
        showEventDescriptions:false,
        columnsPerPage:5
    });
    var _calStart=isc.DateUtil.getStartOf(new Date(2016,6,5),"W");
    var _calEnd=_calStart.duplicate();
    _calEnd.setDate(_calEnd.getDate()+20);
    var timelineGrouped=isc.Timeline.create({
        width:500,
        height:451,
        autoDraw:false,
        startDate:_calStart,
        endDate:_calEnd,
        dataSource:isc.DS.get("tasks"),
        autoFetchData:true,
        lanes:developers,
        headerLevels:[{unit:"week"},{unit:"day"}],
        canEditLane:true,
        showEventDescriptions:false,
        columnsPerPage:5,
        laneEventPadding:2,
        disableWeekends:false,
        canGroupLanes:true,
        laneGroupByField:"devGroup",
        laneFields:[
            {name:"title",title:"Developer",minWidth:120,autoFitWidth:true},
            {name:"devGroup",hidden:true}
        ]
    });
    var timelinesPane=isc.FlowLayout.create({
        layoutMargin:10,
        membersMargin:20,
        width:"100%",
        height:"100%",
        autoDraw:false,
        tiles:[timeline1,timelineGrouped]
    });
    isc.SkinUtil.testPanes[paneName]=timelinesPane;
    return isc.SkinUtil.testPanes[paneName];
}
isc._debugModules = (isc._debugModules != null ? isc._debugModules : []);isc._debugModules.push('SkinUtil');isc.checkForDebugAndNonDebugModules();isc._moduleEnd=isc._SkinUtil_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('SkinUtil module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;if (isc.Page) isc.Page.handleEvent(null, "moduleLoaded", { moduleName: 'SkinUtil', loadTime: (isc._moduleEnd-isc._moduleStart)});}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'SkinUtil'.");}
/*

  SmartClient Ajax RIA system
  Version v12.1p_2020-05-06/EVAL Deployment (2020-05-06)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

