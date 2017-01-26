$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010 Q1',
            MiPymes: null,
            emprendedores: 2647
        }, {
            period: '2010 Q2',
            MiPymes: 2294,
            emprendedores: 2441
        }, {
            period: '2010 Q3',
        
             MiPymes: 1969,
            emprendedores: 2501
        }, {
            period: '2010 Q4',
             MiPymes: 3597,
            emprendedores: 5689
        }, {
            period: '2011 Q1',
             MiPymes: 1914,
            emprendedores: 2293
        }, {
            period: '2011 Q2',
             MiPymes: 1914,
            emprendedores: 2293
           
        }, {
            period: '2011 Q3',
           
             MiPymes: 3795,
            emprendedores: 1588
        }, {
            period: '2011 Q4',
            
             MiPymes: 5967,
            emprendedores: 5175
        }, {
            period: '2012 Q1',
           
             MiPymes: 4460,
            emprendedores: 2028
        }, {
            period: '2012 Q2',
             MiPymes: 5713,
            emprendedores: 1791
        }],
        xkey: 'period',
        ykeys: [ 'MiPymes', 'emprendedores'],
        labels: [ 'MiPymes', 'emprendedores'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Empresas Diagnosticadas",
            value: 12
        }, {
            label: "Empresas por Diagnosticar",
            value: 30
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
