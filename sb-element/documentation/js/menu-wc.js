'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sb-element documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/BaseModule.html" data-type="entity-link">BaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BaseModule-891e7286275d8d1d8350681c2ee00b9d"' : 'data-target="#xs-directives-links-module-BaseModule-891e7286275d8d1d8350681c2ee00b9d"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BaseModule-891e7286275d8d1d8350681c2ee00b9d"' :
                                        'id="xs-directives-links-module-BaseModule-891e7286275d8d1d8350681c2ee00b9d"' }>
                                        <li class="link">
                                            <a href="directives/ClassNameInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClassNameInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorBaseDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorBaseDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorClassNameInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorClassNameInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorSizeColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorSizeColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorSizeInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorSizeInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorSizeThemeColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorSizeThemeColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ControlValueAccessorThemeColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlValueAccessorThemeColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/EventManagerDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventManagerDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SizeColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SizeColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SizeInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SizeInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SizeThemeColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SizeThemeColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SizeThemeInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SizeThemeInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StateManagerDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">StateManagerDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ThemeColorInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThemeColorInputDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ThemeInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThemeInputDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link">FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' : 'data-target="#xs-components-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' :
                                            'id="xs-components-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' }>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckboxGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckboxGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IconButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IconButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadioButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadioButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadioButtonGroupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadioButtonGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToggleSwitchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToggleSwitchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' : 'data-target="#xs-directives-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' :
                                        'id="xs-directives-links-module-FormModule-7f8d925063f733dab3fe665590b4a37b"' }>
                                        <li class="link">
                                            <a href="directives/SelectionOptionsDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectionOptionsDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SbElementModule.html" data-type="entity-link">SbElementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' : 'data-target="#xs-components-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' :
                                            'id="xs-components-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' }>
                                            <li class="link">
                                                <a href="components/AlertBoxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlertComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' : 'data-target="#xs-directives-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' :
                                        'id="xs-directives-links-module-SbElementModule-6a93fe465a7c8a3099a6c28e99253fd4"' }>
                                        <li class="link">
                                            <a href="directives/ThemeInputDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThemeInputDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ColumnInformation.html" data-type="entity-link">ColumnInformation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnInformationDefaults.html" data-type="entity-link">ColumnInformationDefaults</a>
                            </li>
                            <li class="link">
                                <a href="classes/Csv.html" data-type="entity-link">Csv</a>
                            </li>
                            <li class="link">
                                <a href="classes/Queue.html" data-type="entity-link">Queue</a>
                            </li>
                            <li class="link">
                                <a href="classes/Table.html" data-type="entity-link">Table</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link">ThemeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Alert.html" data-type="entity-link">Alert</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertServiceSubscriber.html" data-type="entity-link">AlertServiceSubscriber</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnInformationInterface.html" data-type="entity-link">ColumnInformationInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnInformationOptionsInterface.html" data-type="entity-link">ColumnInformationOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedOptions.html" data-type="entity-link">SelectedOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableInterface.html" data-type="entity-link">TableInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});