import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Info, Search, Calendar, MapPin, Building, TrendingUp, Filter } from 'lucide-react';

interface SupportProgram {
  id: string;
  title: string;
  description: string;
  organization: string;
  category: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  applicationUrl?: string;
  status: 'active' | 'upcoming' | 'closed';
}

interface SpaceRental {
  id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  price: string;
  size: string;
  amenities: string[];
  imageUrl?: string;
  availability: string;
}

const supportPrograms: SupportProgram[] = [
  {
    id: '1',
    title: '서울시 청년 예술가 창작 지원',
    description: '만 39세 이하 청년 예술가의 창작 활동을 지원하는 프로그램입니다.',
    organization: '서울문화재단',
    category: '창작지원',
    amount: '최대 500만원',
    deadline: '2024-04-30',
    eligibility: ['만 39세 이하', '서울시 거주', '예술 관련 경력 1년 이상'],
    status: 'active'
  },
  {
    id: '2',
    title: '지역 예술 공간 운영 지원',
    description: '지역 내 예술 공간 운영을 위한 임대료 및 운영비 지원',
    organization: '문화체육관광부',
    category: '공간지원',
    amount: '월 최대 200만원',
    deadline: '2024-05-15',
    eligibility: ['예술 공간 운영자', '지역 예술 프로그램 진행'],
    status: 'active'
  },
  {
    id: '3',
    title: '예술인 복지 지원 사업',
    description: '예술 활동 증명을 받은 예술인의 생활 안정을 위한 지원',
    organization: '한국예술인복지재단',
    category: '복지지원',
    amount: '월 최대 120만원',
    deadline: '상시모집',
    eligibility: ['예술활동증명 보유자', '소득 요건 충족'],
    status: 'active'
  }
];

const spaceRentals: SpaceRental[] = [
  {
    id: '1',
    name: '홍대 크리에이티브 스튜디오',
    description: '예술가들을 위한 창작 공간으로 다양한 장비와 시설을 제공합니다.',
    location: '홍대입구역 도보 5분',
    type: '창작공간',
    price: '일 30,000원',
    size: '20평',
    amenities: ['무료 Wi-Fi', '프로젝터', '음향 장비', '주차 가능'],
    availability: '평일 09:00-22:00'
  },
  {
    id: '2',
    name: '강남 갤러리 대관',
    description: '전시회나 아트페어를 위한 갤러리 공간 대관',
    location: '강남구 신사동',
    type: '전시공간',
    price: '주 200,000원',
    size: '50평',
    amenities: ['조명 시설', '보안 시스템', '안내 데스크', '카페 공간'],
    availability: '월-일 10:00-19:00'
  },
  {
    id: '3',
    name: '마포 워크숍 센터',
    description: '교육 프로그램이나 워크숍을 위한 다목적 공간',
    location: '마포구 합정동',
    type: '교육공간',
    price: '시간당 15,000원',
    size: '15평',
    amenities: ['테이블/의자', '화이트보드', '빔프로젝터', '간단한 다과 제공'],
    availability: '평일 09:00-18:00'
  }
];

export function SupportInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');

  const categories = ['전체', '창작지원', '공간지원', '복지지원', '교육지원'];
  const spaceTypes = ['전체', '창작공간', '전시공간', '교육공간'];

  const filteredPrograms = supportPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSpaces = spaceRentals.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '전체' || space.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">예술인 지원 정보</h2>
            <p className="text-gray-600">정부 지원 사업과 저렴한 공간 대여 정보를 한 곳에서</p>
          </div>
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            데이터 분석 리포트
          </Button>
        </div>
      </div>

      <Tabs defaultValue="support" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="support">지원 사업</TabsTrigger>
          <TabsTrigger value="spaces">공간 대여</TabsTrigger>
          <TabsTrigger value="analysis">소비 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="support" className="mt-6">
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="지원 사업 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Support Programs */}
            <div className="grid grid-cols-1 gap-6">
              {filteredPrograms.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={program.status === 'active' ? 'default' : 'secondary'}
                            className={program.status === 'active' ? 'bg-green-500' : ''}
                          >
                            {program.status === 'active' ? '접수중' : program.status === 'upcoming' ? '예정' : '마감'}
                          </Badge>
                          <Badge variant="outline">{program.category}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                        <p className="text-gray-600 mb-4">{program.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">지원기관</span>
                        <p className="font-medium">{program.organization}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">지원금액</span>
                        <p className="font-medium text-purple-600">{program.amount}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">접수마감</span>
                        <p className="font-medium">{program.deadline}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 mb-2 block">지원 자격</span>
                      <div className="flex flex-wrap gap-2">
                        {program.eligibility.map((requirement, index) => (
                          <Badge key={index} variant="secondary">
                            {requirement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button variant="outline">상세 정보</Button>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        신청하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="spaces" className="mt-6">
          <div className="space-y-6">
            {/* Space Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="공간 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="공간 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Space Rentals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSpaces.map((space) => (
                <Card key={space.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="outline" className="mb-2">{space.type}</Badge>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{space.name}</h3>
                        <p className="text-gray-600 mb-3">{space.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">위치</span>
                        <p className="font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {space.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">가격</span>
                        <p className="font-medium text-purple-600">{space.price}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">크기</span>
                        <p className="font-medium">{space.size}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">이용시간</span>
                        <p className="font-medium">{space.availability}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-500 mb-2 block">제공 시설</span>
                      <div className="flex flex-wrap gap-2">
                        {space.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button variant="outline">상세 보기</Button>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        예약하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="space-y-6">
            {/* Analysis Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  서울시 문화예술 소비 패턴 분석
                </CardTitle>
                <CardDescription>
                  서울 열린데이터광장의 문화예술 소비 데이터를 분석하여 예술인에게 유용한 정보를 제공합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Analysis Charts Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>지역별 문화예술 소비 현황</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <p className="text-gray-600">지역별 소비 데이터 차트</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>월별 예술 활동 트렌드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <p className="text-gray-600">월별 트렌드 분석</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI 추천 창작 공간</CardTitle>
                <CardDescription>
                  소비 패턴 분석을 바탕으로 귀하의 예술 활동에 적합한 지역과 공간을 추천해드립니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">홍대 지역</h4>
                    <p className="text-sm text-purple-700 mb-2">청년층 문화 소비 활발</p>
                    <p className="text-xs text-purple-600">추천 이유: 거리 예술 수요 높음</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">강남 지역</h4>
                    <p className="text-sm text-green-700 mb-2">고급 예술품 구매력 우수</p>
                    <p className="text-xs text-green-600">추천 이유: 프리미엄 작품 선호</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">성수 지역</h4>
                    <p className="text-sm text-blue-700 mb-2">신진 작가 관심도 상승</p>
                    <p className="text-xs text-blue-600">추천 이유: 트렌디한 예술 공간 증가</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}